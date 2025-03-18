import { useQuery } from '@apollo/client';
import { GET_CVS } from '@shared/queries/users/getCvs';

const useGetCvs = () => {
  return useQuery(GET_CVS);
};

export default useGetCvs;
