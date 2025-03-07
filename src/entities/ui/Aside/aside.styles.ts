import { Avatar, Box, Button, Text } from '@chakra-ui/react';
import { MenuContent } from '@shared/ui/menu';
import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

export const StyledAsideContainer = styled(Box)<{ $isClosed: boolean }>`
  grid-area: navigation;
  min-height: 100vh;
  width: ${(props) => (props.$isClosed ? '56px' : '200px')};
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 44px;
  padding-bottom: 16px;
  overflow-x: hidden;
`;

export const StyledNavContainer = styled(Box)`
  width: 100%;
  padding: 0;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 56px;
  gap: 16px;
  padding: 9px 16px;
  text-decoration: none;
  width: 100%;
  overflow-x: hidden;
  transition:
    background 200ms,
    color 200ms;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledIcon = styled(Box)`
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  flex-shrink: 0;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StyledUserContainer = styled(Box)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  max-width: 100%;
  color: inherit;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 56px;
  min-height: 56px;
  padding: 0 8px;
  border-radius: 0 200px 200px 0;
  transition:
    background-color 250ms,
    box-shadow 250ms,
    border-color 250ms,
    color 250ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledAvatarRoot = styled(Avatar.Root)`
  color: rgb(245, 245, 247);
  background-color: rgb(198, 48, 49);
`;

export const StyledEmailText = styled(Text)`
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

export const StyledMenuContent = styled(MenuContent)`
  width: 200px;
  padding: 8px 0;
`;

export const StyledMenuButton = styled(Button)`
  padding: 6px 16px;
  background-color: transparent;
  color: inherit;
  display: flex;
  gap: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledToggleButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.54);
  margin: 14px 0 0 8px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 150ms;
`;

export const StyledChevronIcon = styled(Box)<{ $isClosed: boolean }>`
  transform: ${(props) =>
    props.$isClosed ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: transform 200ms;
`;

export const StyledHr = styled.hr`
  margin: 8px 0;
`;
