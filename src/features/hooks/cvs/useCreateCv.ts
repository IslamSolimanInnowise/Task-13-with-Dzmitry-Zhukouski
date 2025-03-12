import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { CREATE_CV } from '@shared/queries/cvs/createCv';
import { router } from '@shared/router';

const useCreateCv = (onClose: () => void) => {
  return useMutation(CREATE_CV, {
    onCompleted: (data) => {
      if (data.createCv?.id) {
        notify({
          type: 'success',
          title: 'CV was created',
        });
        onClose();
        router.navigate({
          to: '/cvs/$cvId',
          params: { cvId: data.createCv.id },
        });
      }
    },
    onError: () => {
      onClose();
    },
  });
};

export default useCreateCv;
