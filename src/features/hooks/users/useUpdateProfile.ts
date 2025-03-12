import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_PROFILE } from '@shared/queries/users/updateProfile';

const useUpdateProfile = () => {
  return useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
  });
};
export default useUpdateProfile;
