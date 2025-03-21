import { Button, Field, NativeSelect } from '@chakra-ui/react';
import useGetDepartments from '@features/hooks/users/useGetDepartments';
import useGetPositions from '@features/hooks/users/useGetPositions';
import useGetUser from '@features/hooks/users/useGetUser';
import useUpdateProfile from '@features/hooks/users/useUpdateProfile';
import useUpdateUser from '@features/hooks/users/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  UpdateUserForm,
  updateUserFormSchema,
} from '@shared/schemas/updateUserFormSchema';
import { authVar } from '@shared/store/globalAuthState';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledForm, StyledInput } from './updateProfileForm.styles';

interface GetData {
  id: string;
  name: string;
}

interface UpdateProfileFormProps {
  userId: string;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ userId }) => {
  const { t } = useTranslation('users');

  const { id } = authVar();
  const {
    data: { user },
  } = useGetUser(userId);

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
          userId,
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
          userId,
          departmentId: department?.id || currentDepartmentId,
          positionId: position?.id || currentPositionId,
        },
      },
    });
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <Field.Root disabled={userId !== id}>
        <Field.Label>{t('updateUserModal.firstNameFieldLabel')}</Field.Label>
        <StyledInput
          type="text"
          {...register('firstName')}
          defaultValue={user.profile.first_name}
          placeholder={user.profile.first_name}
        />
      </Field.Root>
      <Field.Root disabled={userId !== id}>
        <Field.Label>{t('updateUserModal.lastNameFieldLabel')}</Field.Label>
        <StyledInput
          type="text"
          {...register('lastName')}
          defaultValue={user.profile.last_name}
          placeholder={user.profile.last_name}
        />
      </Field.Root>

      <Field.Root invalid={!!errors.department} disabled={userId !== id}>
        <Field.Label>{t('updateUserModal.departmentFieldLabel')}</Field.Label>
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
      </Field.Root>

      <Field.Root invalid={!!errors.position} disabled={userId !== id}>
        <Field.Label>{t('updateUserModal.positionFieldLabel')}</Field.Label>
        <NativeSelect.Root size="md">
          <NativeSelect.Field
            placeholder={user.position_name}
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
      </Field.Root>

      {userId === id && (
        <Button type="submit">{t('updateUserModal.modalConfirmText')}</Button>
      )}
    </StyledForm>
  );
};
export default UpdateProfileForm;
