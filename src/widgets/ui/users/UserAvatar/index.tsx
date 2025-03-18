import { Avatar } from '@chakra-ui/react';

import { StyledAvatar } from './userAvatar.styles';

interface UserAvatarProps {
  row: {
    original: {
      profile: {
        avatar: string | null;
        first_name: string | null;
      };
      email: string;
    };
  };
}

const UserAvatar: React.FC<UserAvatarProps> = ({ row }) => {
  return row.original.profile.avatar ? (
    <StyledAvatar src={row.original.profile.avatar} alt="Avatar" />
  ) : row.original.profile.first_name ? (
    <Avatar.Root>
      <Avatar.Fallback name={row.original.profile.first_name} />
    </Avatar.Root>
  ) : (
    <Avatar.Root>
      <Avatar.Fallback name={row.original.email} />
    </Avatar.Root>
  );
};
export default UserAvatar;
