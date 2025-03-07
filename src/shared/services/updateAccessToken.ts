import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { UPDATE_TOKEN } from '@shared/queries/auth/updateToken';
import { router } from '@shared/router';
import { authVar } from '@shared/store/globalAuthState';

const updateAccessToken = async () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_URI,
      headers: {
        Authorization: `Bearer ${authVar().refreshToken}`,
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
        accessToken: null,
        refreshToken: null,
        id: null,
      });

      router.navigate({ to: '/auth/login' });
    }
  }
};

export default updateAccessToken;
