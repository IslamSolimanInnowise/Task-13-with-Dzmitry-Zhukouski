import Aside from '@entities/ui/Aside';
import useGetUser from '@features/hooks/users/useGetUser';

import { StyledPageContainer, StyledPageContent } from './profile.styles';
import Breadcrumb from '@entities/ui/Breadcrumb';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { data: currentUser, loading } = useGetUser(userId);
  console.log(currentUser);
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
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfilePage;
