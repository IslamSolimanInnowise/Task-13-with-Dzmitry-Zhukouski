import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { ADD_LANGUAGE } from '@shared/queries/users/addProfileLanguage';
import { GET_USER } from '@shared/queries/users/getUser';
import { authVar } from '@shared/store/globalAuthState';

const useAddLanguage = () => {
  const { id } = authVar();

  return useMutation(ADD_LANGUAGE, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('users:usersNotifications.useAddLanguage.success'),
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useAddLanguage;
