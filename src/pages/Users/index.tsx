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
import { useState, useTransition } from 'react';

import { columns } from './table';
import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './users.styles';

const UsersPage: React.FC = () => {
  const { data, loading } = useGetUsers();
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const usersTable = useReactTable({
    data: data?.users || [],
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
