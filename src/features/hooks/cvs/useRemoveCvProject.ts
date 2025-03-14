import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';
import { REMOVE_CV_PROJECT } from '@shared/queries/cvs/removeCvProject';

const useRemoveCvProject = (onClose: () => void, cvId: string) => {
  return useMutation(REMOVE_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'info',
        title: 'CV project was removed',
      });
      onClose();
    },
    onError: () => {
      onClose();
    },
  });
};

export default useRemoveCvProject;
