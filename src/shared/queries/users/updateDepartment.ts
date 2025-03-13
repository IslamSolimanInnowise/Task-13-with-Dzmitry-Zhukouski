import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`;
