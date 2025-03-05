import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { UPDATE_TOKEN } from '@features/auth/updateToken';

const useUpdateToken = () => {
  return useMutation(UPDATE_TOKEN, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Registration successful',
      });
    },
  });
};

export default useUpdateToken;
