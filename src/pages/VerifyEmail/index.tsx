import VerifyMailForm from '@widgets/ui/auth/VerifyMailForm';

import { VerifyMailContainer } from './VerifyEmail.styles';

const VerifyMailPage: React.FC = () => {
  return (
    <VerifyMailContainer>
      <VerifyMailForm />
    </VerifyMailContainer>
  );
};
export default VerifyMailPage;
