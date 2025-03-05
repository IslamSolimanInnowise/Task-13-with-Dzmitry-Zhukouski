import { Box, Text } from '@chakra-ui/react';

import { StyledBackButton } from './Page404.styles';

export const Page404 = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
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
      {token ? (
        <StyledBackButton to={`/users/${id}`}>Back</StyledBackButton>
      ) : (
        <StyledBackButton to="/auth/login">Back</StyledBackButton>
      )}
    </Box>
  );
};
