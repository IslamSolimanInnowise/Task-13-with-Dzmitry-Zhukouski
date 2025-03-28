import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;
