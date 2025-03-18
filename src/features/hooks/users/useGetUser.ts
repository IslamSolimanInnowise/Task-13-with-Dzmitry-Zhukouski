import { useQuery } from '@apollo/client';
import { notify } from '@shared/Notifications/notify';
import { GET_USER } from '@shared/queries/users/getUser';

const useGetUser = (userId: string) => {
  return useQuery(GET_USER, {
    variables: { userId },
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Login successful',
      });
    },
  });
};

export default useGetUser;
