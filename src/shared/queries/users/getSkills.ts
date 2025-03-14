import { gql } from '@apollo/client';

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category_name
      category_parent_name
      category {
        id
        name
      }
    }
  }
`;
