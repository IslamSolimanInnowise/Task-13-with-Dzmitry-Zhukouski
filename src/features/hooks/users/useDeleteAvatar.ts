import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { DELETE_AVATAR } from '@shared/queries/users/deleteAvatar';
import { GET_USER } from '@shared/queries/users/getUser';
import { authVar } from '@shared/store/globalAuthState';

const useDeleteAvatar = () => {
  const { id } = authVar();

  return useMutation(DELETE_AVATAR, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your avatar has been Deleted',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useDeleteAvatar;
