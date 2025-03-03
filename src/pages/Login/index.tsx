import AuthHeader from '@entities/ui/AuthHeader';
import LoginForm from '@widgets/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <AuthHeader />
      <LoginForm />
    </div>
  );
};
export default LoginPage;
