import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Notifications } from '@app/Notifications';
import { routeTree } from '@app/routeTree.gen';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { authVar } from '@features/auth/globalAuthState';
import errorLink from '@shared/services/apollo-client';
import { GlobalStyles } from '@shared/styles/globalStyles';
import { lightTheme } from '@shared/styles/theme';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const { access_token } = authVar();

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

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <RouterProvider router={router} />
            <Notifications />
          </ThemeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </StrictMode>,
  );
}
