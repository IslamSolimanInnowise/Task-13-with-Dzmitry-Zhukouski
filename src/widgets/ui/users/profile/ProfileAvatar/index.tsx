import { Avatar, Button } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import useDeleteAvatar from '@features/hooks/users/useDeleteAvatar';
import useUploadAvatar from '@features/hooks/users/useUploadAvatar';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AvatarFormValues,
  avatarSchema,
} from '@shared/schemas/addAvatarSchema';
import { authVar } from '@shared/store/globalAuthState';
import { useForm } from 'react-hook-form';

import { User } from '../../types';
import { convertFileToBase64 } from './convertToBase64';

interface ProfileAvatarProps {
  user: User;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user }) => {
  const { id } = authVar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    mode: 'all',
  });

  const [uploadAvatar, { loading }] = useUploadAvatar();
  const [deleteAvatar] = useDeleteAvatar();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setValue('avatar', file);
      trigger('avatar');
      onSubmit();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const base64 = await convertFileToBase64(data.avatar);

    uploadAvatar({
      variables: {
        avatar: {
          size: data.avatar.size,
          type: data.avatar.type,
          base64,
          userId: user.id,
        },
      },
    });
  });

  const onDeleteAvatar = () => {
    deleteAvatar({
      variables: {
        avatar: { userId: user.id },
      },
    });
  };

  return (
    <section>
      <Avatar.Root size="2xl">
        <Avatar.Fallback name={user.profile.first_name || user.email} />
        <Avatar.Image src={user.profile.avatar} />
      </Avatar.Root>
      {id === user.id && (
        <>
          <Button onClick={onDeleteAvatar}>Remove Avatar</Button>
          <form onSubmit={onSubmit}>
            <Field.Root disabled={loading}>
              <Field.Label>Upload Avatar</Field.Label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                {...register('avatar')}
                onChange={onChange}
              />
              <Field.ErrorText>{errors?.avatar?.message}</Field.ErrorText>
            </Field.Root>
          </form>
        </>
      )}
    </section>
  );
};

export default ProfileAvatar;
