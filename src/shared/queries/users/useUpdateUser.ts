import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';

import { UPDATE_USER } from './updateUser';
import { GET_USERS } from './users';

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
