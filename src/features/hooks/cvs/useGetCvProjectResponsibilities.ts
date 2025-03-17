import { useQuery } from '@apollo/client';
import { GET_CV_PROJECT_RESPONSIBILITIES } from '@shared/queries/cvs/getCvProjectResponsibilities';

const useGetCvProjectResponsibilities = (
  cvId: string,
  projectId: string | null,
) => {
  return useQuery(GET_CV_PROJECT_RESPONSIBILITIES, {
    variables: { cvId, projectId },
  });
};

export default useGetCvProjectResponsibilities;
