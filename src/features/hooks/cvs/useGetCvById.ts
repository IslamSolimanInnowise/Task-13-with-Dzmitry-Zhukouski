import { useQuery } from '@apollo/client';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';

const useGetCvById = (cvId: string) => {
  return useQuery(GET_CV_BY_ID, {
    variables: { cvId },
  });
};

export default useGetCvById;
