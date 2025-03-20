import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';

import {
  StyledPageContainer,
  StyledPageContent,
} from './profileLanguages.styles';

interface ProfileLanguagesPageProps {
  userId: string;
}

const ProfileLanguagesPage: React.FC<ProfileLanguagesPageProps> = ({
  userId,
}) => {
  const { data, loading } = useGetUser(userId);

  const currentUser = data?.user;

  const userLinkName =
    currentUser?.profile?.first_name.trim() || currentUser?.email;

  return (
    <StyledPageContainer>
      <Aside />
      {!loading && (
        <StyledPageContent>
          <Breadcrumb
            currentLink={'Languages'}
            breadCrumbItems={[
              { name: 'Employees', path: '/users' },
              {
                name: userLinkName,
                path: '/users/$userId',
                params: { userId },
              },
            ]}
          />
          <ProfileHeader userId={currentUser.id} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfileLanguagesPage;
