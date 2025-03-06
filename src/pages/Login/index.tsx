import AuthHeader from '@entities/ui/AuthHeader';
import LoginForm from '@widgets/ui/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <AuthHeader />
      <LoginForm />
    </div>
  );
};
export default LoginPage;
