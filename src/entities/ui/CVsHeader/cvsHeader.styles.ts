import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
export const StyledCVsHeader = styled.header`
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0.75rem;
`;

export const StyledLink = styled(Link)`
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.color};
  padding: 1rem 2rem;
  text-transform: uppercase;
`;
