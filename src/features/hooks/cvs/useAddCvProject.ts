import { useMutation } from '@apollo/client';
import { ADD_CV_PROJECT } from '@shared/queries/cvs/addCvProject';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';

const useAddCvProject = (cvId: string) => {
  return useMutation(ADD_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
  });
};

export default useAddCvProject;
