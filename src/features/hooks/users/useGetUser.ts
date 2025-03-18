import { useQuery } from '@apollo/client';
import { GET_USER } from '@shared/queries/users/getUser';

const useGetUser = (userId: string) => {
  return useQuery(GET_USER, {
    variables: { userId },
  });
};

export default useGetUser;
