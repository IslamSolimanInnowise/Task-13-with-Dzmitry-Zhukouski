import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

export const StyledProfileHeader = styled.header`
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const StyledLink = styled(Link)<{ params: { userId: string } }>`
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.color};
  padding: 0.5rem;
  text-transform: uppercase;
`;
