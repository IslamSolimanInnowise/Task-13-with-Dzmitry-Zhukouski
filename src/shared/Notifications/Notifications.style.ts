import { Stack } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledNotificationsBox = styled(Stack)<{ language: string }>`
  gap: 0.25rem;
  width: 20%;
  position: fixed;
  bottom: 1rem;
  right: ${({ language }) => (language === 'ar' ? 'unset' : '1rem')};
  left: ${({ language }) => (language === 'ar' ? '1rem' : 'unset')};
  z-index: 1300;
  display: flex;
  flex-direction: column;
`;
