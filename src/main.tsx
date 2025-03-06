import { ApolloProvider } from '@apollo/client';
import { Notifications } from '@app/Notifications';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { router } from '@shared/router';
import client from '@shared/services/apollo-client';
import { GlobalStyles } from '@shared/styles/globalStyles';
import { lightTheme } from '@shared/styles/theme';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

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
