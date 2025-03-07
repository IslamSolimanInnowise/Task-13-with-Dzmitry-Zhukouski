import { useLazyQuery } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { LOGIN_USER } from '@shared/queries/auth/loginUser';
import { authVar } from '@shared/store/globalAuthState';

const useLogin = () => {
  return useLazyQuery(LOGIN_USER, {
    onCompleted: (res) => {
      notify({
        type: 'success',
        title: 'Login successful',
      });

      localStorage.setItem('access-token', res.login.access_token);
      localStorage.setItem('refresh-token', res.login.refresh_token);
      localStorage.setItem('id', res.login.user.id);
      localStorage.setItem('email', res.login.user.email);

      authVar({
        accessToken: res.login.access_token,
        refreshToken: res.login.refresh_token,
        id: res.login.user.id,
        email: res.login.user.email,
      });
    },
  });
};

export default useLogin;
