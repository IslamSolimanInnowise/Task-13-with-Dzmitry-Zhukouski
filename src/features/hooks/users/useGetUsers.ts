import { useQuery } from '@apollo/client';
import { GET_USERS } from '@shared/queries/users/users';

const useGetUsers = () => {
  return useQuery(GET_USERS);
};

export default useGetUsers;
