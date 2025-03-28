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
        position {
          name
        }
      }
      skills {
        name
        categoryId
        mastery
      }
      projects {
        id
        name
        description
        domain
        start_date
        end_date
        environment
        responsibilities
        roles
        project {
          id
        }
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
