import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0px;
`;

export const StyledTableHeader = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const StyledTableHeaderRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.primaryColor};
`;

export const StyledTableHeaderCell = styled.th`
  padding: 8px 16px;
  vertical-align: top;
  border-bottom: ${({ theme }) => theme.primaryColor};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  color: rgb(46, 46, 46);
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;

export const StyledTableBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const StyledTableBodyRow = styled.tr<{ $isLast: boolean }>`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
  border-bottom: ${({ $isLast }) =>
    $isLast ? '1px solid rgb(189, 189, 189)' : 'none'};
`;

export const StyledTableBodyCategoryCell = styled.td`
  padding: 8px 16px;
  vertical-align: top;
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  width: 240px;
  color: rgb(198, 48, 49);
`;

export const StyledTableBodyCell = styled.td<{ $isLeft?: boolean }>`
  padding: 8px 16px;
  vertical-align: top;
  border-bottom: inherit;
  font-size: 14px;
  text-align: center;
  font-weight: 500;

  ${({ $isLeft }) =>
    $isLeft &&
    `
    text-align: left;
  `}
`;
