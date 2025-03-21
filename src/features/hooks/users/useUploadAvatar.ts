import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_USER } from '@shared/queries/users/getUser';
import { UPLOAD_AVATAR } from '@shared/queries/users/uploadAvatar';
import { authVar } from '@shared/store/globalAuthState';

const useUploadAvatar = () => {
  const { id } = authVar();

  return useMutation(UPLOAD_AVATAR, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your avatar has been updated',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useUploadAvatar;
