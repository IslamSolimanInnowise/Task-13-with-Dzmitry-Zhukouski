import AuthHeader from '@entities/ui/AuthHeader';
import RegisterForm from '@widgets/ui/RegisterForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <AuthHeader />
      <RegisterForm />
    </div>
  );
};
export default LoginPage;
