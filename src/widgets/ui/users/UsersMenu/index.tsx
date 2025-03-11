import { MenuRoot } from '@shared/ui/menu';
import { useNavigate } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';

import {
  StyledProfileMenuContent,
  StyledProfileMenuItem,
  StyledProfileMenuTrigger,
} from './usersMenu.styles';

interface UsersMenuProps {
  row: {
    original: {
      id: string;
      role: 'Admin' | 'Employee';
    };
  };
}

const UsersMenu: React.FC<UsersMenuProps> = ({ row }) => {
  const navigate = useNavigate();

  const handleClick = () =>
    navigate({
      to: '/users/$userId',
      params: { userId: row.original.id },
    });

  return (
    <MenuRoot>
      <StyledProfileMenuTrigger asChild>
        <EllipsisVertical />
      </StyledProfileMenuTrigger>
      <StyledProfileMenuContent>
        <StyledProfileMenuItem value="profile" onClick={handleClick}>
          Profile
        </StyledProfileMenuItem>
        <StyledProfileMenuItem value="update">
          Update user
        </StyledProfileMenuItem>
        <StyledProfileMenuItem
          value="delete"
          disabled={row.original.role === 'Employee'}
        >
          Delete user
        </StyledProfileMenuItem>
      </StyledProfileMenuContent>
    </MenuRoot>
  );
};
export default UsersMenu;
