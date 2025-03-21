import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { DELETE_CV_SKILL } from '@shared/queries/cvs/deleteCvSkill';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';

const useDeleteCvSkill = (onCloseDialog: () => void, cvId: string) => {
  return useMutation(DELETE_CV_SKILL, {
    refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'info',
        title: i18n.t('cvs:notifications.useDeleteCvSkill.success'),
      });
      onCloseDialog();
    },
  });
};

export default useDeleteCvSkill;
