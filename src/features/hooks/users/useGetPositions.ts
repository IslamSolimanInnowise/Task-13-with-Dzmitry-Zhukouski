import { useQuery } from '@apollo/client';
import { GET_POSITIONS } from '@shared/queries/users/getPositions';

const useGetPositions = () => {
  return useQuery(GET_POSITIONS);
};

export default useGetPositions;
