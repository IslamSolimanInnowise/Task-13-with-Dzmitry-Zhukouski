import { Avatar } from '@chakra-ui/react';
import { router } from '@shared/router';
import { authVar } from '@shared/store/globalAuthState';
import { MenuRoot } from '@shared/ui/menu';
import { createColumnHelper } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

import {
  StyledAvatar,
  StyledChvronRight,
  StyledProfileMenuContent,
  StyledProfileMenuItem,
  StyledProfileMenuTrigger,
} from './users.styles';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface User {
  id: string;
  email: string;
  department_name: string;
  position_name: string;
  profile: Profile;
  icon: string;
  role: 'Employee' | 'Admin';
}

const columnHelper = createColumnHelper<User>();
const { email: authEmail } = authVar();

export const columns = [
  columnHelper.display({
    id: 'profile_avatar',
    header: '',
    cell: ({ row }) =>
      row.original.profile.avatar ? (
        <StyledAvatar src={row.original.profile.avatar} alt="Avatar" />
      ) : row.original.profile.first_name ? (
        <Avatar.Root>
          <Avatar.Fallback name={row.original.profile.first_name} />
        </Avatar.Root>
      ) : (
        <Avatar.Root>
          <Avatar.Fallback name={row.original.email} />
        </Avatar.Root>
      ),
    enableSorting: false,
  }),
  columnHelper.accessor('profile.first_name', {
    header: 'First Name',
    id: 'first_name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('profile.last_name', {
    header: 'Last Name',
    id: 'last_name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('department_name', {
    header: 'Department',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('position_name', {
    header: 'Position',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.display({
    id: '_icon',
    header: '',
    cell: ({ row }) =>
      authEmail === row.original.email ? (
        <MenuRoot>
          <StyledProfileMenuTrigger asChild>
            <EllipsisVertical />
          </StyledProfileMenuTrigger>
          <StyledProfileMenuContent>
            <StyledProfileMenuItem
              value="profile"
              onClick={() => {
                router.navigate({
                  to: '/users/$userId',
                  params: { userId: row.original.id },
                });
              }}
            >
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
      ) : (
        <StyledChvronRight
          onClick={() => {
            router.navigate({
              to: '/users/$userId',
              params: { userId: row.original.id },
            });
          }}
        />
      ),
    enableSorting: false,
  }),
];
