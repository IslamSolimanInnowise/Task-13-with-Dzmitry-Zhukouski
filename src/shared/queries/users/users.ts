import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      department_name
      position_name
      role
      profile {
        id
        first_name
        last_name
        avatar
      }
      position {
        id
        name
      }
      department {
        id
        name
      }
    }
  }
`;
