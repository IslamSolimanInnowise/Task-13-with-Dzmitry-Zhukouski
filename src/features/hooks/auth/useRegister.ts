import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { REGISTER_USER } from '@shared/queries/auth/registerUser';
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
        accessToken: res.signup.access_token,
        refreshToken: res.signup.refresh_token,
        id: res.signup.user.id,
      });
    },
  });
};

export default useRegister;
