import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_CVS } from '@shared/queries/cvs/getCvs';
import { UPDATE_CV } from '@shared/queries/cvs/updateCv';

const useUpdateCv = () => {
  return useMutation(UPDATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'CV was updated',
      });
    },
  });
};

export default useUpdateCv;
