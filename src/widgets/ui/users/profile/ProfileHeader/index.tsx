import { useTranslation } from 'react-i18next';
import { StyledLink, StyledProfileHeader } from './profileHeader.styles';

interface ProfileHeaderProps {
  userId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId }) => {
  const { t } = useTranslation('users');

  return (
    <StyledProfileHeader>
      <StyledLink
        to="/users/$userId"
        params={{ userId }}
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
        activeOptions={{ exact: true }}
      >
        {t('profileHeader.profile')}
      </StyledLink>

      <StyledLink
        to="/users/$userId/skills"
        params={{ userId }}
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        {t('profileHeader.skills')}
      </StyledLink>
      <StyledLink
        to="/users/$userId/languages"
        params={{ userId }}
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        {t('profileHeader.languages')}
      </StyledLink>
    </StyledProfileHeader>
  );
};
export default ProfileHeader;
