import { ApolloProvider } from '@apollo/client';
import { Notifications } from '@app/Notifications';
import { routeTree } from '@app/routeTree.gen';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import client from '@shared/services/apollo-client';
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
