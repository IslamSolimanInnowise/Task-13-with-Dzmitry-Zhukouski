import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import useGetUser from '@features/hooks/users/useGetUser';
import LanguagesWidget from '@widgets/ui/users/profile/LanguagesWidget';
import ProfileHeader from '@widgets/ui/users/profile/ProfileHeader';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('users');
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
            currentLink={t('languagesBreadcrumb.currentLink')}
            breadCrumbItems={[
              { name: t('languagesBreadcrumb.employeesItem'), path: '/users' },
              {
                name: userLinkName,
                path: '/users/$userId',
                params: { userId },
              },
            ]}
          />
          <ProfileHeader userId={currentUser.id} />
          <LanguagesWidget userId={userId} />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default ProfileLanguagesPage;
