import { gql } from '@apollo/client';

export const DELETE_SKILL = gql`
  mutation DeleteSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
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
