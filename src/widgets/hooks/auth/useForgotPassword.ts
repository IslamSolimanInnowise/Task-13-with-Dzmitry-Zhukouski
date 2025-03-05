import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { FORGOT_PASSWORD } from '@features/auth/forgotPassword';

const useForgotPassword = () => {
  return useMutation(FORGOT_PASSWORD, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Success',
        message: 'We sent you a reset password email. Please check your inbox.',
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

export default useForgotPassword;
