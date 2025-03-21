import i18n from '@shared/i18n/config';
import { useTranslation } from 'react-i18next';

import { User } from '../../types';
import { ProfileDetailsContainer } from './profileDetails.styles';

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const { t } = useTranslation('users');
  const creationDate = new Date(parseInt(user.created_at))
    .toLocaleDateString(i18n.language, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    .split(',')
    .join('');

  return (
    <ProfileDetailsContainer>
      <h2>{user?.profile?.first_name}</h2>
      <h3>{user.email}</h3>
      <h3>
        {t('profileDetails')} {creationDate}
      </h3>
    </ProfileDetailsContainer>
  );
};
export default ProfileDetails;
