import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';

import { UPDATE_USER } from '../../../shared/queries/users/updateUser';
import { GET_USERS } from '../../../shared/queries/users/users';

const useUpdateUser = () => {
  return useMutation(UPDATE_USER, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
    refetchQueries: [{ query: GET_USERS }],
  });
};
export default useUpdateUser;
