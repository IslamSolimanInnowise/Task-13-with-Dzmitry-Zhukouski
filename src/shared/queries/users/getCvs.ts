import { gql } from '@apollo/client';

export const GET_CVS = gql`
  query GetCvs {
    cvs {
      id
      created_at
      name
      education
      description
    }
  }
`;
