import i18n from '@shared/i18n/config';

import { User } from '../../types';

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const creationDate = new Date(parseInt(user.created_at))
    .toLocaleDateString(i18n.language, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    .split(', ')
    .join(' ');

  return (
    <div>
      <h2>{user?.profile?.first_name}</h2>
      <h3>{user.email}</h3>
      <h3>A Member Since {creationDate}</h3>
    </div>
  );
};
export default ProfileDetails;
