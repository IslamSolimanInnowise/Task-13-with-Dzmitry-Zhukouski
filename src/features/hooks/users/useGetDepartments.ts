import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '@shared/queries/users/getDepartments';

const useGetDepartments = () => {
  return useQuery(GET_DEPARTMENTS);
};

export default useGetDepartments;
