import '@shared/i18n/config';

import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { DialogsContainer } from '@shared/Dialogs';
import { Notifications } from '@shared/Notifications';
import { router } from '@shared/router';
import client from '@shared/services/apollo-client';
import { GlobalStyles } from '@shared/styles/globalStyles';
import { darkTheme, lightTheme } from '@shared/styles/theme';
import { ColorModeProvider, useColorMode } from '@shared/ui/color-mode';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

function ThemedApp() {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <DialogsContainer />
      <Notifications />
    </StyledThemeProvider>
  );
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
            <ThemedApp />
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </StrictMode>,
  );
}
