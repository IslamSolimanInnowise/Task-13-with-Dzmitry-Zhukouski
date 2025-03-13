import { gql } from '@apollo/client';

export const ADD_SKILL = gql`
  mutation AddSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      first_name
      last_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
