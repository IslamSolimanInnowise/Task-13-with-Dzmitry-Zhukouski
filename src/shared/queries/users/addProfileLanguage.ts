import { gql } from '@apollo/client';

export const ADD_LANGUAGE = gql`
  mutation AddLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
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
