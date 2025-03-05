import { useLazyQuery } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { authVar } from '@features/auth/globalAuthState';
import { LOGIN_USER } from '@features/auth/loginUser';
import { useNavigate } from '@tanstack/react-router';

const useLogin = () => {
  const navigate = useNavigate();

  return useLazyQuery(LOGIN_USER, {
    onCompleted: (res) => {
      notify({
        type: 'success',
        title: 'Login successful',
      });

      localStorage.setItem('access-token', res.login.access_token);
      localStorage.setItem('refresh-token', res.login.refresh_token);
      localStorage.setItem('id', res.login.user.id);
      authVar({
        access_token: res.login.access_token,
        refresh_token: res.login.refresh_token,
        id: res.login.user.id,
      });
      navigate({ to: '/users/$userId', params: { userId: res.login.user.id } });
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

export default useLogin;
