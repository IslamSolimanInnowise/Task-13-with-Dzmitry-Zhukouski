import { StyledLink, StyledProfileHeader } from './profileHeader.styles';

interface ProfileHeaderProps {
  userId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId }) => {
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
        Profile
      </StyledLink>

      <StyledLink
        to="/users/$userId/skills"
        params={{ userId }}
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        Skills
      </StyledLink>
      <StyledLink
        to="/users/$userId/languages"
        params={{ userId }}
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        Languages
      </StyledLink>
    </StyledProfileHeader>
  );
};
export default ProfileHeader;
