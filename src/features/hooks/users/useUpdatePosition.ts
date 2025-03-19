import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_POSITION } from '@shared/queries/users/updatePosition';

const useUpdatePosition = () => {
  return useMutation(UPDATE_POSITION, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('usersNotifications:useUpdatePosition.success'),
      });
    },
  });
};
export default useUpdatePosition;
