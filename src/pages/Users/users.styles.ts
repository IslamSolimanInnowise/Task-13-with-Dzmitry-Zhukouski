import styled from 'styled-components';

export const StyledPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 'navigation page' 1fr / max-content 1fr;
`;

export const StyledPageContent = styled.main`
  padding: 1rem;
  height: 100vh;
  overflow: auto;
`;

export const Styledh2 = styled.h2`
  color: ${({ theme }) => theme.grey};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 0.75rem;
`;
