import { Table } from '@chakra-ui/react';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import useGetCvs from '@features/hooks/cvs/useGetCvs';
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

import AddCvButton from './AddCvButton';
import {
  StyledSortButton,
  StyledSortIcon,
  StyledTableBodyRow,
  StyledTableBottomHeaderCell,
  StyledTableContainer,
  StyledTableContentCell,
  StyledTableContentDescriptionCell,
  StyledTableContentDescriptionText,
  StyledTableHeader,
  StyledTableHeaderRow,
  StyledTableTopHeaderCell,
} from './cvsTable.styles';
import MoreButton from './MoreButton';

type TableCV = {
  name: string;
  education: string;
  employee: string;
  description: string;
};

type CV = {
  description: string;
  education: string;
  id: string;
  name: string;
  user: {
    email: string;
    id: string;
  };
};

const CvsTable: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  const { data: cvData, loading } = useGetCvs();
  const handledCvData = useMemo(() => {
    return cvData?.cvs.map((cv: CV) => ({
      name: cv.name,
      education: cv.education,
      employee: cv.user.email,
      description: cv.description,
    }));
  }, [cvData]);
  console.log(handledCvData);

  const columns = useMemo<ColumnDef<TableCV>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'education', header: 'Education' },
      { accessorKey: 'employee', header: 'Employee' },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <MoreButton name={row.original.name} />,
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
    data: handledCvData ?? [],
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
    estimateSize: () => 96,
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
            <StyledTableTopHeaderCell>
              <SearchInput
                value={globalFilter}
                handleChange={handleInputChange}
                handleClear={handleClear}
              />
            </StyledTableTopHeaderCell>
            <StyledTableTopHeaderCell>
              <AddCvButton />
            </StyledTableTopHeaderCell>
          </StyledTableHeaderRow>
          <StyledTableHeaderRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header, index) => (
                <StyledTableBottomHeaderCell
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
                </StyledTableBottomHeaderCell>
              )),
            )}
          </StyledTableHeaderRow>
        </StyledTableHeader>
        {isPending || loading ? (
          <CustomSpinner />
        ) : (
          <Table.Body
            h={`${rowVirtualizer.getTotalSize()}px`}
            position="relative"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <React.Fragment key={row.id}>
                  <StyledTableBodyRow
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
                  <StyledTableBodyRow
                    transform={`translateY(${virtualRow.start + 48}px)`}
                  >
                    <StyledTableContentDescriptionCell colSpan={4}>
                      <StyledTableContentDescriptionText>
                        {row.original.description}
                      </StyledTableContentDescriptionText>
                    </StyledTableContentDescriptionCell>
                  </StyledTableBodyRow>
                </React.Fragment>
              );
            })}
          </Table.Body>
        )}
      </Table.Root>
    </StyledTableContainer>
  );
};

export default CvsTable;
