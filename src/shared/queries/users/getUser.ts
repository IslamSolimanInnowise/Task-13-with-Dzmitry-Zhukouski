import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      department_name
      position_name
      role
      profile {
        id
        first_name
        last_name
        avatar
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      position {
        id
        name
      }
      department {
        id
        name
      }
    }
  }
`;
