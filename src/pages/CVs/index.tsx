import Aside from '@entities/ui/Aside';
import CVsTable from '@widgets/ui/cvs/CVsTable';

import { StyledPageContainer } from './cvs.styles';

const CVsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <CVsTable />
    </StyledPageContainer>
  );
};
export default CVsPage;
