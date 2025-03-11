import { Box, Icon, Table, Text } from '@chakra-ui/react';
import SearchInput from '@entities/ui/SearchInput';
import CustomSpinner from '@entities/ui/Spinner';
import { MenuItem, MenuRoot, MenuTrigger } from '@shared/ui/menu';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { EllipsisVertical, Plus } from 'lucide-react';
import React, { useMemo, useRef, useState, useTransition } from 'react';

import {
  StyledAddCvButton,
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
  StyledSortButton,
  StyledSortIcon,
} from './cvsTable.styles';

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
        cell: () => (
          <MenuRoot>
            <MenuTrigger asChild>
              <StyledMoreButton>
                <Icon as={EllipsisVertical} />
              </StyledMoreButton>
            </MenuTrigger>
            <StyledMenuContent>
              <MenuItem asChild value="cv">
                <StyledMenuButton>
                  <Text>Details</Text>
                </StyledMenuButton>
              </MenuItem>
              <MenuItem asChild value="delete-cv">
                <StyledMenuButton>
                  <Text>Delete CV</Text>
                </StyledMenuButton>
              </MenuItem>
            </StyledMenuContent>
          </MenuRoot>
        ),
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
    <Box gridArea="page" h="100vh" overflow="auto" pl="24px">
      <Table.ScrollArea height="100%" ref={tableContainerRef}>
        <Table.Root size="md">
          <Table.Header zIndex={5} position="sticky" top="0" border="none">
            <Table.Row bg="#F5F5F7">
              <Box h="56px" p="8px 20px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <SearchInput
                    value={globalFilter}
                    handleChange={handleInputChange}
                    handleClear={handleClear}
                  />
                  <StyledAddCvButton variant="ghost" onClick={() => {}}>
                    <Icon as={Plus} w={5} h={5} />
                    Create CV
                  </StyledAddCvButton>
                </Box>
              </Box>
              <Box style={{ display: 'flex' }}>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header, index) => (
                    <Table.ColumnHeader
                      key={header.id}
                      textAlign="left"
                      flex={header.id === 'actions' ? '0 0 50px' : '1'}
                      px={index === 0 ? '20px' : '8px'}
                      py="8px"
                      borderBottom="1px solid #F5F5F7"
                      whiteSpace="nowrap"
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
                    </Table.ColumnHeader>
                  )),
                )}
              </Box>
            </Table.Row>
          </Table.Header>
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
                  <Table.Row
                    key={row.id}
                    position="absolute"
                    top={0}
                    transform={`translateY(${virtualRow.start}px)`}
                    w="100%"
                    display="flex"
                    bg="#F5F5F7"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <Table.Cell
                        key={cell.id}
                        px={index === 0 ? '20px' : '8px'}
                        py="8px"
                        borderBottom="1px solid #F5F5F7"
                        flex={cell.column.id === 'actions' ? '0 0 50px' : '1'}
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        display="flex"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                );
              })}
            </Table.Body>
          )}
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

export default CvsTable;
