import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { VERIFY_MAIL } from '@shared/queries/auth/verifyEmail';
import { authVar } from '@shared/store/globalAuthState';
import { useNavigate } from '@tanstack/react-router';

const useVerifyMail = () => {
  const navigate = useNavigate();

  return useMutation(VERIFY_MAIL, {
    onCompleted: () => {
      navigate({
        to: '/users/$userId',
        params: { userId: authVar().id! },
      });

      notify({
        type: 'success',
        title: 'Success',
        message: 'Your email is successfully verified.',
      });
    },
  });
};

export default useVerifyMail;
