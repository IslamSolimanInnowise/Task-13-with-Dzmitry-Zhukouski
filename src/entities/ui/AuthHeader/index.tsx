import { StyledAuthHeader, StyledLink } from './authHeader.styles';

const AuthHeader: React.FC = () => {
  return (
    <StyledAuthHeader>
      <StyledLink
        to="/login"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        Login
      </StyledLink>
      <StyledLink
        to="/register"
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
