import { Table } from '@chakra-ui/react';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import useGetCvProjects from '@features/hooks/cvs/useGetCvProjects';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { CvProject } from 'cv-graphql';
import React, { useMemo, useRef, useState, useTransition } from 'react';

import AddCvProjectButton from './AddCvProjectButton';
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
} from './cvprojects.styles';
import MoreButton from './MoreButton';

type CVProjectsProps = {
  cvId: string;
};

const CVProjects: React.FC<CVProjectsProps> = ({ cvId }) => {
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [, startTransition] = useTransition();
  const { data: cvProjectsData, loading: isCvProjectsLoading } =
    useGetCvProjects(cvId);

  const handledCvProjectsData = useMemo(() => {
    if (!cvProjectsData || !cvProjectsData.cv) return [];
    return cvProjectsData?.cv.projects.map((project: CvProject) => ({
      id: project.id,
      name: project.name,
      domain: project.domain,
      startDate: project.start_date,
      endDate: project.end_date,
      description: project.description,
      responsibilities: project.responsibilities,
    }));
  }, [cvProjectsData]);

  type TableCV = Pick<
    CvProject,
    | 'id'
    | 'name'
    | 'domain'
    | 'start_date'
    | 'end_date'
    | 'description'
    | 'responsibilities'
  >;

  const columns = useMemo<ColumnDef<TableCV>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'domain', header: 'Domain' },
      { accessorKey: 'startDate', header: 'Start Date' },
      { accessorKey: 'endDate', header: 'End Date' },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <MoreButton id={row.original.id} />,
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
    data: handledCvProjectsData ?? [],
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
          <AddCvProjectButton />
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
          No results found
        </StyledTableNoContentCell>
      </StyledTableBodyRow>
    </Table.Body>
  );

  if (isCvProjectsLoading) return <CustomSpinner />;

  return (
    <StyledTableContainer ref={tableContainerRef}>
      <Table.Root>
        {tableHeader}
        {tableBody}
      </Table.Root>
    </StyledTableContainer>
  );
};

export default CVProjects;
