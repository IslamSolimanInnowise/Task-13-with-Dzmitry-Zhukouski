import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { DELETE_CV } from '@shared/queries/cvs/deleteCv';
import { GET_CVS } from '@shared/queries/cvs/getCvs';

const useDeleteCv = (onCloseDialog: () => void) => {
  return useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    onCompleted: (data) => {
      if (data.deleteCv?.affected) {
        notify({
          type: 'info',
          title: i18n.t('cvs:notifications.useDeleteCv.success'),
        });
        onCloseDialog();
      }
    },
  });
};

export default useDeleteCv;
