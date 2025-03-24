import { Input, NativeSelect } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  padding: 0.75rem;
  background-color: ${(props) =>
    props.disabled ? props.theme.lightGrey : 'transparent'};
  border-width: 1.5px;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
  &:disabled {
    cursor: auto;
    opacity: 1;

    &::placeholder {
      color: inherit;
    }
  }
`;

export const StyledSelect = styled(NativeSelect.Field)`
  padding-left: 0.75rem;
  &:disabled {
    cursor: auto;
    opacity: 1;
  }
`;
