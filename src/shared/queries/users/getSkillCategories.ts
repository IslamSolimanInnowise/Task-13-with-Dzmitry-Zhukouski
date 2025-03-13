import { gql } from '@apollo/client';

export const GET_SKILL_CATEGORIES = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
      order
      children {
        id
        name
        order
      }
    }
  }
`;
