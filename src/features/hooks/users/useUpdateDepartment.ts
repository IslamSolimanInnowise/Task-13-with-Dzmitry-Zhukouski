import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_DEPARTMENT } from '@shared/queries/users/updateDepartment';

const useUpdateDepartment = () => {
  return useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
  });
};
export default useUpdateDepartment;
