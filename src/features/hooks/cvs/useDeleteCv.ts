import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { DELETE_CV } from '@shared/queries/cvs/deleteCv';
import { GET_CVS } from '@shared/queries/cvs/getCvs';

const useDeleteCv = (onClose: () => void) => {
  return useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    onCompleted: (data) => {
      if (data.deleteCv?.affected) {
        notify({
          type: 'info',
          title: 'CV was deleted',
        });
        onClose();
      }
    },
    onError: () => {
      onClose();
    },
  });
};

export default useDeleteCv;
