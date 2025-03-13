import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_POSITION } from '@shared/queries/users/updatePosition';

const useUpdatePosition = () => {
  return useMutation(UPDATE_POSITION, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
  });
};
export default useUpdatePosition;
