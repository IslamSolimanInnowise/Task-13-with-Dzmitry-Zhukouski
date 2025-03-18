import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { GET_CVS } from '@shared/queries/cvs/getCvs';
import { UPDATE_CV } from '@shared/queries/cvs/updateCv';

const useUpdateCv = () => {
  return useMutation(UPDATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('cvsNotifications:useUpdateCv.success'),
      });
    },
  });
};

export default useUpdateCv;
