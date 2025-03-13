import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      created_at
      email
      is_verified
      department {
        id
        name
      }
      department_name
      position {
        id
        name
      }
      position_name
      role
    }
  }
`;
