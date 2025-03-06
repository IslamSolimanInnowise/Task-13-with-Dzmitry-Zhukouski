import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { VERIFY_MAIL } from '@features/auth/verifyEmail';

const useVerifyMail = () => {
  return useMutation(VERIFY_MAIL, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Success',
        message: 'Your email is successfully verified.',
      });
    },
  });
};

export default useVerifyMail;
