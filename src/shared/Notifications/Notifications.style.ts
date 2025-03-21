import { Stack } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledNotificationsBox = styled(Stack)`
  gap: 0.25rem;
  width: 20%;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1500;
  display: flex;
  flex-direction: column;
`;
