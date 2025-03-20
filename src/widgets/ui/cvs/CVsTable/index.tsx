import { Table } from '@chakra-ui/react';
import SearchInput from '@entities/ui/SearchInput';
import Spinner from '@entities/ui/Spinner';
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
import type { Cv, User } from 'cv-graphql';
import React, { useMemo, useRef, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

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
  StyledTableNoContentCell,
  StyledTableTopHeaderCell,
} from './cvsTable.styles';
import MoreButton from './MoreButton';

const CVsTable: React.FC = () => {
  const { t } = useTranslation('cvs');
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [, startTransition] = useTransition();
  const { data: cvData, loading: isCvsLoading } = useGetCvs();

  const handledCvData = useMemo(() => {
    if (!cvData || !cvData.cvs) return [];
    return cvData?.cvs.map((cv: Cv) => ({
      id: cv.id,
      name: cv.name,
      education: cv.education,
      employee: cv.user?.email,
      description: cv.description,
    }));
  }, [cvData]);

  type TableCV = Pick<Cv, 'id' | 'name' | 'education' | 'description'> &
    Pick<User, 'email'>;

  const columns = useMemo<ColumnDef<TableCV>[]>(
    () => [
      { accessorKey: 'name', header: t('table.tableHeaders.name') },
      { accessorKey: 'education', header: t('table.tableHeaders.education') },
      { accessorKey: 'employee', header: t('table.tableHeaders.employee') },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <MoreButton id={row.original.id} name={row.original.name} />
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableSorting: false,
      },
    ],
    [t],
  );

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: handledCvData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
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

  const tableColumns = table.getHeaderGroups().map((headerGroup) =>
    headerGroup.headers.map((header, index) => (
      <StyledTableBottomHeaderCell
        key={header.id}
        $isFirst={index === 0}
        $isActions={header.id === 'actions'}
      >
        {header.id !== 'actions' && (
          <StyledSortButton onClick={header.column.getToggleSortingHandler()}>
            {flexRender(header.column.columnDef.header, header.getContext())}
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
  );

  const tableHeader = (
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
      <StyledTableHeaderRow>{tableColumns}</StyledTableHeaderRow>
    </StyledTableHeader>
  );

  const tableBody = rowVirtualizer.getVirtualItems().length ? (
    <Table.Body h={`${rowVirtualizer.getTotalSize()}px`} position="relative">
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = table.getRowModel().rows[virtualRow.index];
        return (
          <React.Fragment key={row.id}>
            <StyledTableBodyRow transform={`translateY(${virtualRow.start}px)`}>
              {row.getVisibleCells().map((cell, index) => (
                <StyledTableContentCell
                  key={cell.id}
                  $isFirst={index === 0}
                  $isActions={cell.column.id === 'actions'}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  ) : (
    <Table.Body h={`${rowVirtualizer.getTotalSize()}px`} position="relative">
      <StyledTableBodyRow>
        <StyledTableNoContentCell colSpan={columns.length}>
          {t('table.tableBody.noContent')}
        </StyledTableNoContentCell>
      </StyledTableBodyRow>
    </Table.Body>
  );

  if (isCvsLoading) return <Spinner />;

  return (
    <StyledTableContainer ref={tableContainerRef}>
      <Table.Root>
        {tableHeader}
        {tableBody}
      </Table.Root>
    </StyledTableContainer>
  );
};

export default CVsTable;
