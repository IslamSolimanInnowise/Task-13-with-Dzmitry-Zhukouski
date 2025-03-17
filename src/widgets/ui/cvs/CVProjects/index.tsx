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
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

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
  StyledTableContentResponsibilitiesText,
  StyledTableContentResponsibilitiesTextContainer,
  StyledTableHeader,
  StyledTableHeaderRow,
  StyledTableNoContentCell,
  StyledTableTopHeaderCell,
} from './cvprojects.styles';
import { TableCV } from './index.d';
import MoreButton from './MoreButton';

type CVProjectsProps = {
  cvId: string;
};

const CVProjects: React.FC<CVProjectsProps> = ({ cvId }) => {
  const [globalFilter, setGlobalFilter] = useState<string[]>([]);
  const [, startTransition] = useTransition();
  const { data: cvProjectsData, loading: isCvProjectsLoading } =
    useGetCvProjects(cvId);

  const rowHeights = useRef<{ [key: string]: number }>({});

  const handledCvProjectsData: TableCV[] = useMemo(() => {
    if (!cvProjectsData || !cvProjectsData.cv) return [];
    return cvProjectsData?.cv.projects.map((project: CvProject) => ({
      id: project.id,
      name: project.name,
      domain: project.domain,
      start_date: project.start_date,
      end_date: project.end_date ?? 'Till now',
      description: project.description,
      responsibilities: project.responsibilities ?? [],
      projectId: project.project.id,
    }));
  }, [cvProjectsData]);

  const columns = useMemo<ColumnDef<TableCV>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'domain', header: 'Domain' },
      { accessorKey: 'start_date', header: 'Start Date' },
      { accessorKey: 'end_date', header: 'End Date' },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          return (
            <MoreButton
              cvId={cvId}
              projectId={row.original.projectId}
              cvProjects={handledCvProjectsData}
              projectName={row.original.name}
            />
          );
        },
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableSorting: false,
      },
    ],
    [cvId, handledCvProjectsData],
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
    count: table.getRowModel().rows.length * 2,
    estimateSize: (index: number) => {
      const rowIndex = Math.floor(index / 2);
      const isDescriptionRow = index % 2 === 1;
      const row = table.getRowModel().rows[rowIndex];
      const key = isDescriptionRow ? `${row.id}-desc` : row.id;
      return rowHeights.current[key] ?? (isDescriptionRow ? 48 : 56);
    },
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
  });

  const onRowRender = (rowId: string, el: HTMLDivElement | null) => {
    if (el) {
      const newHeight = el.getBoundingClientRect().height;
      if (rowHeights.current[rowId] !== newHeight) {
        rowHeights.current[rowId] = newHeight;
        rowVirtualizer.measure();
      }
    }
  };

  useEffect(() => {
    rowVirtualizer.measure();
  }, [handledCvProjectsData, rowVirtualizer]);

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
          <AddCvProjectButton cvId={cvId} cvProjects={handledCvProjectsData} />
        </StyledTableTopHeaderCell>
      </StyledTableHeaderRow>
      <StyledTableHeaderRow>{tableColumns}</StyledTableHeaderRow>
    </StyledTableHeader>
  );

  const tableBody = rowVirtualizer.getVirtualItems().length ? (
    <Table.Body h={`${rowVirtualizer.getTotalSize()}px`} position="relative">
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const rowIndex = Math.floor(virtualRow.index / 2);
        const isDescriptionRow = virtualRow.index % 2 === 1;
        const row = table.getRowModel().rows[rowIndex];

        if (isDescriptionRow) {
          return (
            <StyledTableBodyRow
              key={`${row.id}-desc`}
              ref={(el) => onRowRender(`${row.id}-desc`, el)}
              transform={`translateY(${virtualRow.start}px)`}
            >
              <StyledTableContentDescriptionCell colSpan={5}>
                <StyledTableContentDescriptionText>
                  {row.original.description}
                </StyledTableContentDescriptionText>
                {row.original.responsibilities.join(', ') && (
                  <StyledTableContentResponsibilitiesTextContainer>
                    <StyledTableContentResponsibilitiesText>
                      {row.original.responsibilities.join(', ')}
                    </StyledTableContentResponsibilitiesText>
                  </StyledTableContentResponsibilitiesTextContainer>
                )}
              </StyledTableContentDescriptionCell>
            </StyledTableBodyRow>
          );
        }

        return (
          <StyledTableBodyRow
            key={row.id}
            ref={(el) => onRowRender(row.id, el)}
            transform={`translateY(${virtualRow.start}px)`}
          >
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
        );
      })}
    </Table.Body>
  ) : (
    <Table.Body h={`${rowVirtualizer.getTotalSize()}px`} position="relative">
      <StyledTableBodyRow>
        <StyledTableNoContentCell colSpan={5}>
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
