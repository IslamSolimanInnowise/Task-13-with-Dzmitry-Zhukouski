import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { notify } from '@app/Notifications/notify';
import { authVar } from '@shared/store/globalAuthState';

import updateAccessToken from './updateAccessToken';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message }) => {
      if (message === 'Unauthorized') {
        if (authVar().refreshToken !== null) {
          const newToken = await updateAccessToken();

          if (newToken) {
            localStorage.setItem('access-token', newToken);

            authVar({
              accessToken: newToken,
              refreshToken: authVar().refreshToken,
              id: authVar().id,
            });
          }
        }
      } else {
        notify({
          type: 'error',
          title: 'Error',
          message,
        });
      }
    });
  }

  if (networkError) {
    notify({
      type: 'error',
      title: 'Error',
      message: networkError.message,
    });
  }
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const { accessToken } = authVar();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
