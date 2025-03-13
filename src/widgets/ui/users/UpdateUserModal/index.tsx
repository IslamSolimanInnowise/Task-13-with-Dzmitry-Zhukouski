import { Field, NativeSelect } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useGetDepartments from '@features/hooks/users/useGetDepartments';
import useGetPositions from '@features/hooks/users/useGetPositions';
import useUpdateProfile from '@features/hooks/users/useUpdateProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateUser from '@shared/queries/users/useUpdateUser';
import {
  defaultValues,
  UpdateUserForm,
  updateUserFormSchema,
} from '@shared/schemas/updateUserFormSchema';
import { useForm } from 'react-hook-form';

import { User } from '../types';
import { roles } from './selectInputData';
import { StyledForm, StyledInput } from './updateUserModal.styles';

interface GetData {
  id: string;
  name: string;
}

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

  const [updateUser] = useUpdateUser();
  const [updateProfile] = useUpdateProfile();
  const { data: deps } = useGetDepartments();
  const { data: pos } = useGetPositions();

  const onSubmit = handleSubmit((data) => {
    updateProfile({
      variables: {
        profile: {
          userId: user.id,
          first_name: data.firstName || user.profile.first_name,
          last_name: data.lastName || user.profile.last_name,
        },
      },
    });

    const position = pos.positions.find(
      (p: GetData) => p.name === data.position,
    );

    const department = deps.departments.find(
      (d: GetData) => d.name === data.department,
    );

    const currentDepartmentId = user?.department?.id;
    const currentPositionId = user?.position?.id;

    updateUser({
      variables: {
        user: {
          userId: user.id,
          departmentId: department?.id || currentDepartmentId,
          positionId: position?.id || currentPositionId,
        },
      },
    });

    setIsModalOpen(false);
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
          <StyledInput type="text" {...register('firstName')} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <StyledInput type="text" {...register('lastName')} />
        </Field.Root>

        <Field.Root invalid={!!errors.department}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              placeholder={user.department_name}
              {...register('department')}
              defaultValue={user.department_name}
            >
              {deps?.departments.map((dep: GetData) => {
                return (
                  <option value={dep.name} key={dep.id}>
                    {dep.name}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.department?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.position}>
          <Field.Label>Position</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              placeholder={user.position_name && ''}
              {...register('position')}
              defaultValue={user.position_name}
            >
              {pos?.positions.map((pos: GetData) => {
                return (
                  <option value={pos.name} key={pos.id}>
                    {pos.name}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.position?.message}</Field.ErrorText>
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
