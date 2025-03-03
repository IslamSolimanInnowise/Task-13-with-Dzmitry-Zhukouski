import { Link } from '@tanstack/react-router';

const AuthHeader: React.FC = () => {
  return (
    <header>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign up</Link>
    </header>
  );
};
export default AuthHeader;
