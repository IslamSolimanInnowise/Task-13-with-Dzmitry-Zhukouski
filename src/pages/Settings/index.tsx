import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './settings.styles';

const SettingsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <main></main>
    </StyledPageContainer>
  );
};
export default SettingsPage;
