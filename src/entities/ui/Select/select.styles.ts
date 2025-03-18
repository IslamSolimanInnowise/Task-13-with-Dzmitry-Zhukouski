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
