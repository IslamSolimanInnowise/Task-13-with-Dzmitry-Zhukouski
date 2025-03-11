import { authVar } from '@shared/store/globalAuthState';
import { createColumnHelper } from '@tanstack/react-table';
import StyledChevronRight from '@widgets/ui/users/StyledChevronRight';
import UserAvatar from '@widgets/ui/users/UserAvatar';
import UsersMenu from '@widgets/ui/users/UsersMenu';

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
    cell: ({ row }) => <UserAvatar row={row} />,
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
        <UsersMenu row={row} />
      ) : (
        <StyledChevronRight row={row} />
      ),
    enableSorting: false,
  }),
];
