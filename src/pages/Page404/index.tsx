import { Box, Text } from '@chakra-ui/react';
import { authVar } from '@shared/store/globalAuthState';

import { StyledBackButton } from './Page404.styles';

export const Page404 = () => {
  const { accessToken, id } = authVar();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Page not found
      </Text>
      {accessToken ? (
        <StyledBackButton to={`/users/${id}`}>Back</StyledBackButton>
      ) : (
        <StyledBackButton to="/auth/login">Back</StyledBackButton>
      )}
    </Box>
  );
};
