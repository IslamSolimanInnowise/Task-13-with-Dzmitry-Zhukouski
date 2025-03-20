import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';

import { UPDATE_USER } from '../../../shared/queries/users/updateUser';
import { GET_USERS } from '../../../shared/queries/users/users';

const useUpdateUser = () => {
  return useMutation(UPDATE_USER, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('users:usersNotifications.useUpdateUser.success'),
      });
    },
    refetchQueries: [{ query: GET_USERS }],
  });
};
export default useUpdateUser;
