import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { DialogsContainer } from '@shared/Dialogs';
import { Notifications } from '@shared/Notifications';
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
            <DialogsContainer />
            <Notifications />
          </ThemeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </StrictMode>,
  );
}
