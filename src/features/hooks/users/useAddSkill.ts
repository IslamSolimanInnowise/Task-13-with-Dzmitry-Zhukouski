import { useMutation } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { ADD_SKILL } from '@shared/queries/users/addProfileSkill';

const useAddSkill = () => {
  return useMutation(ADD_SKILL, {
    onCompleted: (res) => {
      notify({
        type: 'success',
        title: 'Your Data has been updated!',
      });
      console.log(res);
    },
  });
};
export default useAddSkill;
