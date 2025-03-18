import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';
import { UPDATE_CV_PROJECT } from '@shared/queries/cvs/updateCvProject';

const useUpdateCvProject = (onCloseDialog: () => void, cvId: string) => {
  return useMutation(UPDATE_CV_PROJECT, {
    refetchQueries: [
      { query: GET_CV_PROJECTS, variables: { cvId } },
      { query: GET_CV_BY_ID, variables: { cvId } },
    ],
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'CV project was updated',
      });
      onCloseDialog();
    },
    onError: () => {
      onCloseDialog();
    },
  });
};

export default useUpdateCvProject;
