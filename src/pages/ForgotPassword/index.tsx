import ForgotPasswordForm from '@widgets/ui/auth/ForgotPasswordForm';

import { ForgotPasswordContainer } from './ForgotPassword.styles';

const ForgotPasswordPage: React.FC = () => {
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordForm />
    </ForgotPasswordContainer>
  );
};
export default ForgotPasswordPage;
