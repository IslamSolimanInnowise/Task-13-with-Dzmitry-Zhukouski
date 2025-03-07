import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './languages.styles';

const LanguagesPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <main></main>
    </StyledPageContainer>
  );
};
export default LanguagesPage;
