import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_USER } from '@shared/queries/users/getUser';
import { UPLOAD_AVATAR } from '@shared/queries/users/uploadAvatar';
import { authVar } from '@shared/store/globalAuthState';
import { useTranslation } from 'react-i18next';

const useUploadAvatar = () => {
  const { t } = useTranslation('users');
  const { id } = authVar();

  return useMutation(UPLOAD_AVATAR, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: t('usersNotifications.useUploadAvatar.success'),
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useUploadAvatar;
