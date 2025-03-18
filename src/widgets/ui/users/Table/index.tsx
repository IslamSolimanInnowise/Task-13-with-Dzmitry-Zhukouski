import { Table } from '@tanstack/react-table';
import { User } from '@widgets/ui/users/types';

import { StyledTable } from './table.styles';
import TBody from './TBody';
import THead from './THead';

interface TableProps {
  usersTable: Table<User>;
}

const UsersTable: React.FC<TableProps> = ({ usersTable }) => {
  return (
    <StyledTable as="table" w={usersTable.getTotalSize()}>
      <THead usersTable={usersTable} />
      <TBody usersTable={usersTable} />
    </StyledTable>
  );
};

export default UsersTable;
