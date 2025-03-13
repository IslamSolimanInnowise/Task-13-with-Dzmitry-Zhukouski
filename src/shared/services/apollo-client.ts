import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { notify } from '@shared/Notifications/notify';
import { authVar } from '@shared/store/globalAuthState';
import { from as fromPromise, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

import updateAccessToken from './updateAccessToken';

let isRefreshing = false;
const pendingRequests: ((token: string) => void)[] = [];

const resolvePendingRequests = (newToken: string) => {
  pendingRequests.forEach((callback) => callback(newToken));
  pendingRequests.length = 0;
};

const handleUnauthorizedError = async (): Promise<string | null> => {
  try {
    if (!authVar().refreshToken) throw new Error('No refresh token');

    const newToken = await updateAccessToken();
    if (!newToken) throw new Error('Token refresh failed');

    localStorage.setItem('access-token', newToken);
    authVar({
      ...authVar(),
      accessToken: newToken,
    });

    return newToken;
  } catch {
    authVar({ accessToken: null, refreshToken: null, id: null, email: null });
    localStorage.removeItem('access-token');
    return null;
  } finally {
    isRefreshing = false;
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const firstError = graphQLErrors[0];
      if (firstError.message === 'Unauthorized') {
        let request$: Observable<unknown>;

        if (!isRefreshing) {
          isRefreshing = true;
          request$ = fromPromise(handleUnauthorizedError()).pipe(
            filter((newToken) => !!newToken),
            switchMap((newToken) => {
              resolvePendingRequests(newToken!);
              return forward(operation);
            }),
            catchError((error) => {
              pendingRequests.length = 0;
              return throwError(error);
            }),
          );
        } else {
          request$ = new Observable((observer) => {
            pendingRequests.push((newToken: string) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`,
                },
              }));
              forward(operation).subscribe(observer);
            });
          });
        }

        return request$;
      }

      notify({
        type: 'error',
        title: 'Error',
        message: firstError.message,
      });
    }

    if (networkError) {
      notify({
        type: 'error',
        title: 'Error',
        message: networkError.message,
      });
    }
  },
);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${authVar().accessToken || ''}`,
  },
}));

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    createHttpLink({
      uri: import.meta.env.VITE_GRAPHQL_URI,
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
