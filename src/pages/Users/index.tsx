import Aside from '@entities/ui/Aside';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import useGetUsers from '@features/hooks/users/useGetUsers';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import UsersTable from '@widgets/ui/users/Table';
import { useMemo, useState, useTransition } from 'react';

import { columns } from './table';
import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './users.styles';
import { authVar } from '@shared/store/globalAuthState';

const UsersPage: React.FC = () => {
  const { data, loading } = useGetUsers();
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { email: authEmail } = authVar();

  const sortedUsers = useMemo(() => {
    if (!data?.users) return [];

    return [...data.users].sort((a, b) => {
      if (a.email === authEmail) return -1;
      if (b.email === authEmail) return 1;
      return 0;
    });
  }, [data?.users, authEmail]);

  const usersTable = useReactTable({
    data: sortedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <CustomSpinner />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter([e.target.value]);

    startTransition(() => {
      usersTable.setGlobalFilter(String(e.target.value));
    });
  };

  const handleClear = () => {
    setGlobalFilter(['']);
    startTransition(() => {
      usersTable.setGlobalFilter('');
    });
  };

  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>Employees</Styledh2>
        <SearchInput
          value={globalFilter}
          handleChange={handleInputChange}
          handleClear={handleClear}
        />
        {isPending ? <CustomSpinner /> : <UsersTable usersTable={usersTable} />}
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default UsersPage;
