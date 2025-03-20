import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';

import { StyledPageContainer, StyledPageContent } from './profile.styles';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { data: currentUser, loading } = useGetUser(userId);

  const profileCurrentLink =
    currentUser?.user?.profile?.first_name || currentUser?.user?.email;

  return (
    <StyledPageContainer>
      <Aside />
      {!loading && (
        <StyledPageContent>
          <Breadcrumb
            currentLink={profileCurrentLink}
            breadCrumbItems={[{ name: 'Employees', path: '/users' }]}
          />
          <ProfileHeader userId={currentUser.user.id} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfilePage;
