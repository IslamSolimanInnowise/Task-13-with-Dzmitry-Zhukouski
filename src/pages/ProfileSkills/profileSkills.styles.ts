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
