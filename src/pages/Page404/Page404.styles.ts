import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

export const StyledBackButton = styled(Link)`
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 40px;
  width: 220px;
  margin: 1rem auto;
  display: block;
  text-align: center;
  padding: 0.5rem;
  color: ${({ theme }) => theme.backgroundColor};
`;
