import { Field, NativeSelect } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useUpdatePosition from '@features/hooks/users/useUpdatePosition';
import useUpdateProfile from '@features/hooks/users/useUpdateProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  UpdateUserForm,
  updateUserFormSchema,
} from '@shared/schemas/updateUserFormSchema';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { User } from '../types';
import { departments, positions, roles } from './selectInputData';
import { StyledForm, StyledInput } from './updateUserModal.styles';

interface UpdateUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  user: User;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  user,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'all',
    defaultValues,
  });

  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfile();
  const [updatePosition] = useUpdatePosition();

  const onSubmit = handleSubmit((data) => {
    updateProfile({
      variables: {
        profile: {
          userId: user.id,
          first_name: data.profile.first_name,
          last_name: data.profile.last_name,
        },
      },
    });

    updatePosition({
      variables: {
        position: {
          positionId: user.id,
          name: data.position_name,
        },
      },
    });

    setIsModalOpen(false);

    navigate({ to: '/users' });
  });

  return (
    <Modal
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
      titleText="Update User"
      confirmText="Update"
      onConfirm={onSubmit}
      size="lg"
    >
      <StyledForm onSubmit={onSubmit}>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <StyledInput disabled type="email" value={user.email} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <StyledInput disabled type="password" value="******" />
        </Field.Root>
        <Field.Root>
          <Field.Label>First Name</Field.Label>
          <StyledInput type="text" {...register('profile.first_name')} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <StyledInput type="text" {...register('profile.last_name')} />
        </Field.Root>

        <Field.Root invalid={!!errors.department_name}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              placeholder={user.department_name}
              value={user.department_name}
              {...register('department_name')}
            >
              {departments.map((dep) => {
                return (
                  <option value={dep.value} key={dep.label}>
                    {dep.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.department_name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.position_name}>
          <Field.Label>Position</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              placeholder={user.position_name && ''}
              value={user.position_name}
              {...register('position_name')}
            >
              {positions.map((pos) => {
                return (
                  <option value={pos.value} key={pos.label}>
                    {pos.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.position_name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.role} disabled>
          <Field.Label>Role</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              placeholder={user.role && ''}
              value={user.role}
              {...register('role')}
            >
              {roles.map((role) => {
                return (
                  <option value={role.value} key={role.label}>
                    {role.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
        </Field.Root>
      </StyledForm>
    </Modal>
  );
};

export default UpdateUserModal;
