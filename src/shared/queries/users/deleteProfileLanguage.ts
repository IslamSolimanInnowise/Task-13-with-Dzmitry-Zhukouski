import { gql } from '@apollo/client';

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      first_name
      last_name
      avatar
      languages {
        name
        proficiency
      }
    }
  }
`;
