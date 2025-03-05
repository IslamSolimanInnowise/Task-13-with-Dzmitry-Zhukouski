import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      full_name
    }
  }
`;
