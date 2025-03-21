import { Button, Container } from '@chakra-ui/react';
import styled from 'styled-components';

export const CVPreviewContainer = styled(Container)`
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const TopicTitleContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const TopicTitle = styled.h4`
  margin: 0px;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;
`;

export const ExportPdfButton = styled(Button)`
  padding: 6px 8px;
  text-decoration: none;
  float: right;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  appearance: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryColor};
  min-width: 220px;
  height: 40px;
  outline: 0;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.primaryColor};
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 40px;

  &:hover {
    background-color: rgba(198, 48, 49, 0.04);
  }
`;

export const TopicContentContainer = styled.section`
  display: grid;
  grid-template-columns: 260px 1fr;
  margin-bottom: 2rem;
`;

export const LeftTopicSection = styled.section`
  padding-right: 1.5rem;
  padding-bottom: 1rem;
`;

export const RightTopicSection = styled.section`
  padding-left: 1.5rem;
  padding-bottom: 1rem;
  border-left: 1px solid ${({ theme }) => theme.darkPrimaryColor};
`;

export const TopicSectionProjectTitle = styled.p`
  margin: 1rem 0 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: bold;
  text-transform: uppercase;
`;

export const TopicSectionTitle = styled.p`
  margin: 1rem 0 0.5rem;
  font-weight: bold;
`;

export const TopicsDivider = styled.div`
  break-after: page;
`;
