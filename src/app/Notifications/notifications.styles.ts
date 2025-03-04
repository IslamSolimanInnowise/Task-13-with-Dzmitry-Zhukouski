import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledNotificationsBox = styled(Box)`
  && {
    position: absolute;
    right: 1rem;
    top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 1300;
  }
`;

export const StyledNotification = styled(Box)`
  && {
    margin-bottom: 1rem;
    max-width: 20rem;
    width: 100%;
  }
`;
