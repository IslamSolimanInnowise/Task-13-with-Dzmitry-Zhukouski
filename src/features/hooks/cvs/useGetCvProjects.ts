import { useQuery } from '@apollo/client';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';

const useGetCvProjects = (cvId: string) => {
  return useQuery(GET_CV_PROJECTS, {
    variables: { cvId },
  });
};

export default useGetCvProjects;
