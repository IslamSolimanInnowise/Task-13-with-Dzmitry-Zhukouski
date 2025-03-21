import { useMutation } from '@apollo/client';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';
import { REMOVE_CV_PROJECT } from '@shared/queries/cvs/removeCvProject';

const useRemoveCvProject = (cvId: string) => {
  return useMutation(REMOVE_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
  });
};

export default useRemoveCvProject;
