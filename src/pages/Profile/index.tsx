import Aside from '@entities/ui/Aside';

import { StyledPageContainer } from './profile.styles';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <span>Profile: {userId}</span>
    </StyledPageContainer>
  );
};
export default ProfilePage;
