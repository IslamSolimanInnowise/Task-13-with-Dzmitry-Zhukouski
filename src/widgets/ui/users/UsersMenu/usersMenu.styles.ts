import { MenuContent, MenuItem, MenuTrigger } from '@shared/ui/menu';
import styled from 'styled-components';

export const StyledProfileMenuTrigger = styled(MenuTrigger)`
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
  padding: 0.25rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: lightgrey;
  }
`;

export const StyledProfileMenuContent = styled(MenuContent)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledProfileMenuItem = styled(MenuItem)`
  cursor: pointer;
`;
