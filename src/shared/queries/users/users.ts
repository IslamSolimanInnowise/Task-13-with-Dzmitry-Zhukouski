import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      department_name
      position_name
      profile {
        id
        first_name
        last_name
        avatar
      }
    }
  }
`;
