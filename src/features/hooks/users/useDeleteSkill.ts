import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { DELETE_SKILL } from '@shared/queries/users/deleteProfileSkill';
import { GET_USER } from '@shared/queries/users/getUser';
import { authVar } from '@shared/store/globalAuthState';

const useDeleteSkill = () => {
  const { id } = authVar();

  return useMutation(DELETE_SKILL, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Skill has been deleted!',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useDeleteSkill;
