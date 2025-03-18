import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { ADD_CV_PROJECT } from '@shared/queries/cvs/addCvProject';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';

const useAddCvProject = (onCloseDialog: () => void, cvId: string) => {
  return useMutation(ADD_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('cvsNotifications:useAddCvProject.success'),
      });
      onCloseDialog();
    },
    onError: () => {
      onCloseDialog();
    },
  });
};

export default useAddCvProject;
