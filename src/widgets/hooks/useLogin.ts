import { useLazyQuery } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { LOGIN_USER } from '@features/auth';
import { useNavigate } from '@tanstack/react-router';

const useLogin = () => {
  const navigate = useNavigate();

  return useLazyQuery(LOGIN_USER, {
    onCompleted: (res) => {
      notify({
        type: 'success',
        title: 'Login successful',
      });

      localStorage.setItem('token', res.login.access_token);
      localStorage.setItem('id', res.login.user.id);
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
