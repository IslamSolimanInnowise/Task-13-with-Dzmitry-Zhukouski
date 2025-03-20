import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';

import { StyledPageContainer, StyledPageContent } from './profile.styles';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { data, loading } = useGetUser(userId);

  const currentUser = data?.user;

  const profileCurrentLink =
    currentUser?.profile?.first_name.trim() || currentUser?.email;

  return (
    <StyledPageContainer>
      <Aside />
      {!loading && (
        <StyledPageContent>
          <Breadcrumb
            currentLink={profileCurrentLink}
            breadCrumbItems={[{ name: 'Employees', path: '/users' }]}
          />
          <ProfileHeader userId={currentUser.id} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfilePage;
