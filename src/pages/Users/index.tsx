import Aside from '@entities/ui/Aside';
import SearchInput from '@entities/ui/SearchInput';
import Spinner from '@entities/ui/Spinner';
import useGetUsers from '@features/hooks/users/useGetUsers';
import { authVar } from '@shared/store/globalAuthState';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import UsersTable from '@widgets/ui/users/Table';
import { useMemo, useState, useTransition } from 'react';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './users.styles';
import { useTableColumns } from './useTableColumns';

type SortingFunction = (oldState: SortingState) => SortingState;

const UsersPage: React.FC = () => {
  const { data, loading } = useGetUsers();
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isPending, startTransition] = useTransition();
  const { email: authEmail } = authVar();
  const columns = useTableColumns();

  const sortedUsers = useMemo(() => {
    if (!data?.users) return [];

    return [...data.users].sort((a, b) => {
      if (a.email === authEmail) return -1;
      if (b.email === authEmail) return 1;
      return 0;
    });
  }, [data?.users, authEmail]);

  const handleSortingChange = (param: SortingState | SortingFunction) => {
    startTransition(() => {
      setSorting(param);
    });
  };

  const usersTable = useReactTable({
    data: sortedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: handleSortingChange,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <Spinner />;
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
        {isPending ? <Spinner /> : <UsersTable usersTable={usersTable} />}
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default UsersPage;
