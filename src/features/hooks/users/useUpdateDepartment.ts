import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { UPDATE_DEPARTMENT } from '@shared/queries/users/updateDepartment';

const useUpdateDepartment = () => {
  return useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('usersNotifications:useUpdateDepartment.success'),
      });
    },
  });
};
export default useUpdateDepartment;
