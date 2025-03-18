import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { ADD_SKILL } from '@shared/queries/users/addProfileSkill';
import { GET_USER } from '@shared/queries/users/getUser';
import { authVar } from '@shared/store/globalAuthState';

const useAddSkill = () => {
  const { id } = authVar();

  return useMutation(ADD_SKILL, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: id } }],
  });
};
export default useAddSkill;
