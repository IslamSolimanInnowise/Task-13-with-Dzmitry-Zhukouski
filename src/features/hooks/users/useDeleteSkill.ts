import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { DELETE_SKILL } from '@shared/queries/users/deleteProfileSkill';

const useDeleteSkill = () => {
  return useMutation(DELETE_SKILL, {
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Your Skill has been deleted!',
      });
    },
  });
};
export default useDeleteSkill;
