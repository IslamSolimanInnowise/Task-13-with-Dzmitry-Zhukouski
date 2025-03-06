import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { REGISTER_USER } from '@features/auth/registerUser';
import { authVar } from '@shared/store/globalAuthState';

const useRegister = () => {
  return useMutation(REGISTER_USER, {
    onCompleted: (res) => {
      notify({
        type: 'success',
        title: 'Registration successful',
      });

      localStorage.setItem('access-token', res.signup.access_token);
      localStorage.setItem('refresh-token', res.signup.refresh_token);
      localStorage.setItem('id', res.signup.user.id);

      authVar({
        access_token: res.signup.access_token,
        refresh_token: res.signup.refresh_token,
        id: res.signup.user.id,
      });
    },
  });
};

export default useRegister;
