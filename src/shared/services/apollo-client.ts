import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { notify } from '@app/Notifications/notify';

import updateAccessToken from './updateAccessToken';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message }) => {
      notify({
        type: 'error',
        title: 'Error',
        message,
      });

      if (message === 'Unauthorized') {
        console.log('unauthorized');
        // updateAccessToken();
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
  const access_token = localStorage.getItem('access-token');

  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
