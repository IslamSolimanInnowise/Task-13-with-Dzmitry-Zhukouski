import { Select } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledTrigger = styled(Select.Trigger)`
  cursor: pointer;
`;

export const StyledValueText = styled(Select.ValueText)`
  padding-left: 1rem;
`;

export const StyledIndicator = styled(Select.Indicator)`
  padding-right: 0.5rem;
`;

export const StyledItem = styled(Select.Item)`
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

export const StyledItemGroup = styled(Select.ItemGroup)`
  padding: 0.5rem 0;
`;

export const StyledItemGroupLabel = styled(Select.ItemGroupLabel)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 0.875rem;
`;
