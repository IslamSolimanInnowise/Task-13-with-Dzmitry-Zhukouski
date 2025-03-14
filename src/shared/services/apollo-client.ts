import {
  ApolloClient,
  createHttpLink,
  FetchResult,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { notify } from '@shared/Notifications/notify';
import { authVar } from '@shared/store/globalAuthState';
import { from as fromPromise, throwError } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'zen-observable-ts';

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

    const newToken: string = await updateAccessToken();
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
        let request$: Observable<FetchResult>;

        if (!isRefreshing) {
          isRefreshing = true;

          request$ = new Observable<FetchResult>((observer) => {
            fromPromise(handleUnauthorizedError())
              .pipe(
                filter((newToken): newToken is string => !!newToken),
                switchMap((newToken) => {
                  resolvePendingRequests(newToken);
                  return forward(operation);
                }),
                catchError((error) => throwError(() => error)),
              )
              .subscribe({
                next: (value: unknown) => observer.next(value as FetchResult),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
              });
          });
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
