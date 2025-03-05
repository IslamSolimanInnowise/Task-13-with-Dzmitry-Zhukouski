import ResetPasswordForm from '@widgets/ui/ResetPasswordForm';

import { ResetPasswordContainer } from './ResetPassword.styles';

type ResetPasswordPageProps = {
  token: string | null;
};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token }) => {
  return (
    <ResetPasswordContainer>
      <ResetPasswordForm token={token} />
    </ResetPasswordContainer>
  );
};

export default ResetPasswordPage;
