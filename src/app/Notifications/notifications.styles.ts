import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledNotificationsBox = styled(Box)`
  && {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.25rem;
    z-index: 1300;
  }
`;
