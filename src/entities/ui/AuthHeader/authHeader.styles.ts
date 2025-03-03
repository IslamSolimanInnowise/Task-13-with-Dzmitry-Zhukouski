import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
export const StyledAuthHeader = styled.header`
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const StyledLink = styled(Link)`
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.color};
  padding: 0.5rem 1rem;
`;
