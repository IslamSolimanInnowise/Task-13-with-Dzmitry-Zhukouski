import styled from 'styled-components';

export const StyledPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 'navigation page' 1fr / max-content 1fr;
`;

export const SettingsContainer = styled.div`
  grid-area: page;
  height: 100vh;
  overflow: auto;
  padding: 0px 24px;
`;

export const SelectsContainer = styled.div`
  margin: 0px auto;
  width: 100%;
  max-width: 720px;
  padding: 32px 0px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
`;
