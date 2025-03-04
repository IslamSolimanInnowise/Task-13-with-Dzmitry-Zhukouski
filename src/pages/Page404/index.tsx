import { Box, Text } from '@chakra-ui/react';

import { StyledBackButton } from './Page404.styles';

export const Page404 = () => {
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
      <StyledBackButton to="/login">Back</StyledBackButton>
    </Box>
  );
};
