import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';

import { UPDATE_USER } from './updateUser';

const useUpdateUser = () => {
  return useMutation(UPDATE_USER, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
  });
};
export default useUpdateUser;
