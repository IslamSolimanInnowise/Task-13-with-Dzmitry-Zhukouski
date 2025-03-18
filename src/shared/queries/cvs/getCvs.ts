import { gql } from '@apollo/client';

export const GET_CVS = gql`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;
