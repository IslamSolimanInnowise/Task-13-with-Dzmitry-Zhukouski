import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_USER } from '@shared/queries/users/getUser';
import { UPDATE_PROFILE_SKILL } from '@shared/queries/users/updateProfileSkill';
import { authVar } from '@shared/store/globalAuthState';

const useUpdateProfileSkill = () => {
  const { id } = authVar();

  return useMutation(UPDATE_PROFILE_SKILL, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useUpdateProfileSkill;
