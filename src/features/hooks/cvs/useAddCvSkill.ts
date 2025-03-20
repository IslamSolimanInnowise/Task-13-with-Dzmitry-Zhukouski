import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { ADD_CV_SKILL } from '@shared/queries/cvs/addCvSkill';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';

const useAddCvSkill = (onCloseDialog: () => void, cvId: string) => {
  return useMutation(ADD_CV_SKILL, {
    refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('cvs:notifications.useAddCvSkill.success'),
      });
      onCloseDialog();
    },
    onError: () => {
      onCloseDialog();
    },
  });
};

export default useAddCvSkill;
