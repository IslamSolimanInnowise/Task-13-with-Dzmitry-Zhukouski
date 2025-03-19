import { MenuRoot } from '@shared/ui/menu';
import { useNavigate } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '../types';
import UpdateUserModal from '../UpdateUserModal';
import {
  StyledProfileMenuContent,
  StyledProfileMenuItem,
  StyledProfileMenuTrigger,
} from './usersMenu.styles';

interface UsersMenuProps {
  row: {
    original: User;
  };
}

const UsersMenu: React.FC<UsersMenuProps> = ({ row }) => {
  const { t } = useTranslation('users');
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
            {t('usersMenu.profile')}
          </StyledProfileMenuItem>
          <StyledProfileMenuItem
            value="update"
            onClick={() => setIsModalOpen(true)}
          >
            {t('usersMenu.update')}
          </StyledProfileMenuItem>
          <StyledProfileMenuItem
            value="delete"
            disabled={row.original.role === 'Employee'}
          >
            {t('usersMenu.delete')}
          </StyledProfileMenuItem>
        </StyledProfileMenuContent>
      </MenuRoot>
      <UpdateUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={row.original}
      />
    </>
  );
};
export default UsersMenu;
