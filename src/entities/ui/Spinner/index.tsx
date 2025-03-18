import { Spinner as ChakraSpinner } from '@chakra-ui/react';

import { SpinnerContainer } from './spinner.styles';

const Spinner = () => {
  return (
    <SpinnerContainer
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <ChakraSpinner size="xl" />
    </SpinnerContainer>
  );
};
export default Spinner;
