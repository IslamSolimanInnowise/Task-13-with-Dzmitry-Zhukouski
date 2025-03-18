import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
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
        title: i18n.t('verifyEmail.notifyOnSuccess'),
        message: i18n.t('verifyEmail.notifyOnSuccessMessage'),
      });
    },
  });
};

export default useVerifyMail;
