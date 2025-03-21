import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import ProfileAvatar from '@widgets/ui/users/profile/ProfileAvatar';
import ProfileDetails from '@widgets/ui/users/profile/ProfileDetails';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';
import UpdateProfileForm from '@widgets/ui/users/profile/UpdateProfileForm';

import { StyledPageContainer, StyledPageContent } from './profile.styles';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { data, loading } = useGetUser(userId);

  const currentUser = data?.user;
  const profileCurrentLink =
    currentUser?.profile?.first_name || currentUser?.email;

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
          <ProfileAvatar user={currentUser} />
          <ProfileDetails user={currentUser} />
          <UpdateProfileForm userId={userId} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfilePage;
