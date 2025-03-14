import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { ADD_CV_PROJECT } from '@shared/queries/cvs/addCvProject';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';

const useAddCvProject = (onClose: () => void, cvId: string) => {
  return useMutation(ADD_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'CV project was added',
      });
      onClose();
    },
    onError: () => {
      onClose();
    },
  });
};

export default useAddCvProject;
