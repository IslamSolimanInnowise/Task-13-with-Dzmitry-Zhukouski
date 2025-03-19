import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { DELETE_LANGUAGE } from '@shared/queries/users/deleteProfileLanguage';
import { GET_USER } from '@shared/queries/users/getUser';
import { authVar } from '@shared/store/globalAuthState';

const useDeleteLanguage = () => {
  const { id } = authVar();

  return useMutation(DELETE_LANGUAGE, {
    onCompleted: () => {
      notify({
        type: 'info',
        title: i18n.t('usersNotifications:useDeleteLanguage.success'),
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useDeleteLanguage;
