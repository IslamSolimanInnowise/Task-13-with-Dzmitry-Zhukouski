import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';
import SkillsWidget from '@widgets/ui/users/SkillsWidget';

import { StyledPageContainer, StyledPageContent } from './profileSkills.styles';

interface ProfileSkillsPageProps {
  userId: string;
}

const ProfileSkillsPage: React.FC<ProfileSkillsPageProps> = ({ userId }) => {
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
            currentLink={'Skills'}
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
          <SkillsWidget userId={userId} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfileSkillsPage;
