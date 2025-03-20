import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import i18n from '@shared/i18n/config';
import { notify } from '@shared/Notifications/notify';
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
        title: i18n.t('resetPassword.notifyOnSuccess'),
        message: i18n.t('resetPassword.notifyOnSuccessMessage'),
      });
    },
  });
};

export default useResetPassword;
