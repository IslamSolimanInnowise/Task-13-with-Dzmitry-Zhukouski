import { gql } from '@apollo/client';

export const GET_CV_PROJECT_RESPONSIBILITIES = gql`
  query GetCvProjectResponsibilities($cvId: ID!) {
    cv(cvId: $cvId) {
      projects {
        responsibilities
      }
    }
  }
`;
