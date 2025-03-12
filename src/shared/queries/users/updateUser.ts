import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      created_at
      email
      is_verified
      cvs
      department
      department_name
      position
      position_name
      role
    }
  }
`;
