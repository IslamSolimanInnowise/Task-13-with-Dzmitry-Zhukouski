import { useMutation } from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
import { GET_USER } from '@shared/queries/users/getUser';
import { UPDATE_PROFILE_LANGUAGE } from '@shared/queries/users/updateProfileLanguage';
import { authVar } from '@shared/store/globalAuthState';

const useUpdateProfileLanguage = () => {
  const { id } = authVar();

  return useMutation(UPDATE_PROFILE_LANGUAGE, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: i18n.t('usersNotifications:useUpdateProfileLanguage.success'),
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useUpdateProfileLanguage;
