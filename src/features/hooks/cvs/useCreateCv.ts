import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { CREATE_CV } from '@shared/queries/cvs/createCv';
import { GET_CVS } from '@shared/queries/cvs/getCvs';
import { router } from '@shared/router';

const useCreateCv = (onCloseDialog: () => void) => {
  return useMutation(CREATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
    onCompleted: (data) => {
      if (data.createCv?.id) {
        notify({
          type: 'success',
          title: 'CV was created',
        });
        onCloseDialog();
        router.navigate({
          to: '/cvs/$cvId/details',
          params: { cvId: data.createCv.id },
        });
      }
    },
    onError: () => {
      onCloseDialog();
    },
  });
};

export default useCreateCv;
