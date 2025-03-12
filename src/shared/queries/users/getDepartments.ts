import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      created_at
      name
    }
  }
`;
