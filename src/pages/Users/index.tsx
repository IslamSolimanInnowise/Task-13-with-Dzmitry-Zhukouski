import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './users.styles';

const UsersPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <main></main>
    </StyledPageContainer>
  );
};
export default UsersPage;
