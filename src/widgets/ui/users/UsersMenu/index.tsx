import { MenuRoot } from '@shared/ui/menu';
import { useNavigate } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

import UpdateUserModal from '../UpdateUserModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () =>
    navigate({
      to: '/users/$userId',
      params: { userId: row.original.id },
    });

  return (
    <>
      <MenuRoot>
        <StyledProfileMenuTrigger asChild>
          <EllipsisVertical />
        </StyledProfileMenuTrigger>
        <StyledProfileMenuContent>
          <StyledProfileMenuItem value="profile" onClick={handleClick}>
            Profile
          </StyledProfileMenuItem>
          <StyledProfileMenuItem value="update">
            <button onClick={() => setIsModalOpen(true)}>Update user</button>
          </StyledProfileMenuItem>
          <StyledProfileMenuItem
            value="delete"
            disabled={row.original.role === 'Employee'}
          >
            Delete user
          </StyledProfileMenuItem>
        </StyledProfileMenuContent>
      </MenuRoot>
      <UpdateUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
export default UsersMenu;
