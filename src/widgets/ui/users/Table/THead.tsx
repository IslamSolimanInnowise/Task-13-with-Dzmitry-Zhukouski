import { flexRender, Table } from '@tanstack/react-table';
import { User } from '@widgets/ui/users/types';

import {
  StyledSortIcon,
  TableHead,
  TableHeadCell,
  TableHeadRow,
} from './table.styles';

interface THeadProps {
  usersTable: Table<User>;
}

const THead: React.FC<THeadProps> = ({ usersTable }) => {
  return (
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
  );
};
export default THead;
