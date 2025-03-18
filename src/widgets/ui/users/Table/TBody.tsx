import { Box } from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';
import { User } from '@widgets/ui/users/types';

import { TableBodyCell, TableBodyRow } from './table.styles';

interface TBodyProps {
  usersTable: Table<User>;
}

const TBody: React.FC<TBodyProps> = ({ usersTable }) => {
  return (
    <Box as="tbody">
      {usersTable.getRowModel().rows.map((row) => {
        return (
          <TableBodyRow as="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <TableBodyCell as="td" key={cell.id} w={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableBodyCell>
              );
            })}
          </TableBodyRow>
        );
      })}
    </Box>
  );
};
export default TBody;
