import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_PROFILE } from '@shared/queries/users/updateProfile';
import { GET_USERS } from '@shared/queries/users/users';

const useUpdateProfile = () => {
  return useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('usersNotifications:useUpdateProfile.success'),
      });
    },
    refetchQueries: [{ query: GET_USERS }],
  });
};
export default useUpdateProfile;
