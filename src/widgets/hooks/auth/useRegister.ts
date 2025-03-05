import { useMutation } from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { REGISTER_USER } from '@features/auth/registerUser';
import { useNavigate } from '@tanstack/react-router';

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation(REGISTER_USER, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Registration successful',
      });
      navigate({ to: '/auth/login' });
    },
  });
};

export default useRegister;
