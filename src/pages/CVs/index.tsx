import Aside from '@entities/ui/Aside';
import CvsTable from '@widgets/ui/cvs/CvsTable';

import { StyledPageContainer } from './cvs.styles';

const CVsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <CvsTable />
    </StyledPageContainer>
  );
};
export default CVsPage;
