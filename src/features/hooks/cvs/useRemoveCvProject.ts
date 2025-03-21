import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { GET_CV_PROJECTS } from '@shared/queries/cvs/getCvProjects';
import { REMOVE_CV_PROJECT } from '@shared/queries/cvs/removeCvProject';

const useRemoveCvProject = (onCloseDialog: () => void, cvId: string) => {
  return useMutation(REMOVE_CV_PROJECT, {
    refetchQueries: [{ query: GET_CV_PROJECTS, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'info',
        title: i18n.t('cvs:notifications.useRemoveCvProject.success'),
      });
      onCloseDialog();
    },
  });
};

export default useRemoveCvProject;
