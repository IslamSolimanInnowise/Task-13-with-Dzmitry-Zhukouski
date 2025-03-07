import { StyledAuthHeader, StyledLink } from './authHeader.styles';

const AuthHeader: React.FC = () => {
  return (
    <StyledAuthHeader>
      <StyledLink
        to="/auth/login"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        Login
      </StyledLink>
      <StyledLink
        to="/auth/register"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        Sign up
      </StyledLink>
    </StyledAuthHeader>
  );
};
export default AuthHeader;
