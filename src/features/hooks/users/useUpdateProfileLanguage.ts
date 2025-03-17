import { useMutation } from '@apollo/client';
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
        title: 'Your Data has been updated!',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useUpdateProfileLanguage;
