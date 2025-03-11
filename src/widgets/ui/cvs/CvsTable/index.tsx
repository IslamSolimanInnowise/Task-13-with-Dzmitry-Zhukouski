import { Table } from '@chakra-ui/react';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useMemo, useRef, useState, useTransition } from 'react';

import {
  StyledSortButton,
  StyledSortIcon,
  StyledTableBodyRow,
  StyledTableContainer,
  StyledTableContentCell,
  StyledTableHeader,
  StyledTableHeaderCell,
  StyledTableHeaderRow,
} from './cvsTable.styles';
import CvTableAddCvButton from './CvTableAddCvButton';
import CvTableMoreButton from './CvTableMoreButton';

type Person = {
  name: string;
  education: string;
  employee: string;
};

const generateRandomString = (length: number) =>
  Array(length)
    .fill('')
    .map(() =>
      String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65),
    )
    .join('');

const data = Array.from({ length: 100 }, () => ({
  name: generateRandomString(10),
  education: generateRandomString(10),
  employee: `${generateRandomString(5)}@example.com`,
}));

const CvsTable: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'education', header: 'Education' },
      { accessorKey: 'employee', header: 'Employee' },
      {
        id: 'actions',
        header: '',
        cell: () => <CvTableMoreButton />,
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableSorting: false,
      },
    ],
    [],
  );

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 50,
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter([e.target.value]);

    startTransition(() => {
      table.setGlobalFilter(String(e.target.value));
    });
  };

  const handleClear = () => {
    setGlobalFilter(['']);

    startTransition(() => {
      table.setGlobalFilter('');
    });
  };

  return (
    <StyledTableContainer ref={tableContainerRef}>
      <Table.Root>
        <StyledTableHeader>
          <StyledTableHeaderRow>
            <StyledTableHeaderCell>
              <SearchInput
                value={globalFilter}
                handleChange={handleInputChange}
                handleClear={handleClear}
              />
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <CvTableAddCvButton />
            </StyledTableHeaderCell>
          </StyledTableHeaderRow>
          <StyledTableHeaderRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header, index) => (
                <StyledTableContentCell
                  key={header.id}
                  $isFirst={index === 0}
                  $isActions={header.id === 'actions'}
                >
                  {header.id !== 'actions' && (
                    <StyledSortButton
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
                    </StyledSortButton>
                  )}
                </StyledTableContentCell>
              )),
            )}
          </StyledTableHeaderRow>
        </StyledTableHeader>
        {isPending ? (
          <CustomSpinner />
        ) : (
          <Table.Body
            h={`${rowVirtualizer.getTotalSize()}px`}
            position="relative"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <StyledTableBodyRow
                  key={row.id}
                  transform={`translateY(${virtualRow.start}px)`}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <StyledTableContentCell
                      key={cell.id}
                      $isFirst={index === 0}
                      $isActions={cell.column.id === 'actions'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </StyledTableContentCell>
                  ))}
                </StyledTableBodyRow>
              );
            })}
          </Table.Body>
        )}
      </Table.Root>
    </StyledTableContainer>
  );
};

export default CvsTable;
