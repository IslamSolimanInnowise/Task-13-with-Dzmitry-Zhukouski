import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVDetails from '@widgets/ui/cvs/CVDetails';

import {
  StyledCvDetailsContainer,
  StyledPageContainer,
} from './cvdetails.styles';

type CVDetailsPageProps = {
  cvId: string;
};

const CVDetailsPage: React.FC<CVDetailsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvDetailsContainer>
        <CVsHeader />
        <CVDetails cvId={cvId} />
      </StyledCvDetailsContainer>
    </StyledPageContainer>
  );
};
export default CVDetailsPage;
