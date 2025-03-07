import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import { notify } from '@app/Notifications/notify';
import { RESET_PASSWORD } from '@shared/queries/auth/resetPassword';

const useResetPassword = (token: string | null) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_URI,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }),
    cache: new InMemoryCache(),
  });

  return useMutation(RESET_PASSWORD, {
    client,
    onCompleted: () => {
      notify({
        type: 'success',
        title: 'Success',
        message: 'You changed your password!',
      });
    },
  });
};

export default useResetPassword;
