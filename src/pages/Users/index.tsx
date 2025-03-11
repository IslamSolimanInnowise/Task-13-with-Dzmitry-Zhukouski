import { Box } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import useGetUsers from '@features/hooks/users/useGetUsers';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useTransition } from 'react';

import { columns } from './table';
import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
  StyledSortIcon,
  StyledTable,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
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
        {isPending ? (
          <CustomSpinner />
        ) : (
          <StyledTable as="table" w={usersTable.getTotalSize()}>
            <TableHead as="thead">
              {usersTable.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableHeadRow as="tr" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHeadCell
                          as="th"
                          key={header.id}
                          w={header.getSize()}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <StyledSortIcon
                              size={16}
                              $isSorted={header.column.getIsSorted()}
                            />
                          )}
                        </TableHeadCell>
                      );
                    })}
                  </TableHeadRow>
                );
              })}
            </TableHead>
            <Box as="tbody">
              {usersTable.getRowModel().rows.map((row) => {
                return (
                  <TableBodyRow as="tr" key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableBodyCell
                          as="td"
                          key={cell.id}
                          w={cell.column.getSize()}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableBodyCell>
                      );
                    })}
                  </TableBodyRow>
                );
              })}
            </Box>
          </StyledTable>
        )}
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default UsersPage;
