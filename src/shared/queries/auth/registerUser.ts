import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;
