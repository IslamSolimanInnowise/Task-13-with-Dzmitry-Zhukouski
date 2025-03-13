import { Spinner } from '@chakra-ui/react';

import { SpinnerContainer } from './spinner.styles';

const CustomSpinner = () => {
  return (
    <SpinnerContainer
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" />
    </SpinnerContainer>
  );
};
export default CustomSpinner;
