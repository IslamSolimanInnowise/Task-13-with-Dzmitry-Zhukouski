import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './skills.styles';

const SkillsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <main></main>
    </StyledPageContainer>
  );
};
export default SkillsPage;
