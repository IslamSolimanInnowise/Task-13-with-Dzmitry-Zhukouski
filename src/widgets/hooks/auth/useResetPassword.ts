import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { RESET_PASSWORD } from '@features/auth/resetPassword';

const useResetPassword = () => {
  return useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Success',
        message: 'You changed your password!',
      });
    },
    onError: (error) => {
      notify({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
    },
  });
};

export default useResetPassword;
