import { useQuery } from '@apollo/client';
import { GET_CVS } from '@shared/queries/cvs/getCvs';

const useGetCvs = () => {
  return useQuery(GET_CVS);
};

export default useGetCvs;
