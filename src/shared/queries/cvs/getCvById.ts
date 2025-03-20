import { gql } from '@apollo/client';

export const GET_CV_BY_ID = gql`
  query GetCvById($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
      }
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
