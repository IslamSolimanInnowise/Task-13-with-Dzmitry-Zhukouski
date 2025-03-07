import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './cvs.styles';

const CVsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <main></main>
    </StyledPageContainer>
  );
};
export default CVsPage;
