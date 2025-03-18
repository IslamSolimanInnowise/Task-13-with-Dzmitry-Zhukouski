import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { FORGOT_PASSWORD } from '@shared/queries/auth/forgotPassword';

const useForgotPassword = () => {
  return useMutation(FORGOT_PASSWORD, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('forgotPassword.notifyOnSuccess'),
        message: i18n.t('forgotPassword.notifyOnSuccessMessage'),
      });
    },
  });
};

export default useForgotPassword;
