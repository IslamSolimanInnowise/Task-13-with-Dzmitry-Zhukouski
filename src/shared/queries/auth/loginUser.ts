import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query LoginUser($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;
