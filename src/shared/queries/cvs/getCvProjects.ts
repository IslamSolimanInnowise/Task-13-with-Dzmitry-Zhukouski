import { gql } from '@apollo/client';

export const GET_CV_PROJECTS = gql`
  query GetCvById($cvId: ID!) {
    cv(cvId: $cvId) {
      projects {
        id
        name
        description
        domain
        start_date
        end_date
        environment
        responsibilities
      }
    }
  }
`;
