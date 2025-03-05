import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { authVar } from '@features/auth/globalAuthState';
import { UPDATE_TOKEN } from '@features/auth/updateToken';

import { router } from '../../main';

const updateAccessToken = async () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_URI,
      headers: {
        Authorization: `Bearer ${authVar().refresh_token}`,
      },
    }),
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.mutate({
      mutation: UPDATE_TOKEN,
    });

    return response.data.updateToken.access_token;
  } catch (error) {
    if (error instanceof Error) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('id');

      authVar({
        access_token: null,
        refresh_token: null,
        id: null,
      });

      router.navigate({ to: '/auth/login' });
    }
  }
};

export default updateAccessToken;
