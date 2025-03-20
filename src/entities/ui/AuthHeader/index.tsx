import { useTranslation } from 'react-i18next';

import { StyledAuthHeader, StyledLink } from './authHeader.styles';

const AuthHeader: React.FC = () => {
  const { t } = useTranslation('auth');

  return (
    <StyledAuthHeader>
      <StyledLink
        to="/auth/login"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        {t('header.loginLink')}
      </StyledLink>
      <StyledLink
        to="/auth/register"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        {t('header.registerLink')}
      </StyledLink>
    </StyledAuthHeader>
  );
};
export default AuthHeader;
