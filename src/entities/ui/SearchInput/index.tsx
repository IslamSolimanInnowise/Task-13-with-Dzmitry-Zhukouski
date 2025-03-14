import { X } from 'lucide-react';

import {
  StyledEndElementContainer,
  StyledInput,
  StyledInputGroup,
  StyledSearchIcon,
  StyledXIconBox,
} from './searchInput.styles';

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  value: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChange,
  handleClear,
  ...props
}) => {
  return (
    <StyledInputGroup
      startElement={<StyledSearchIcon size="24" />}
      endElement={
        <StyledEndElementContainer
          visibility={value.length ? 'visible' : 'hidden'}
        >
          {value.length && (
            <StyledXIconBox as="button" onClick={handleClear}>
              <X size="24" />
            </StyledXIconBox>
          )}
        </StyledEndElementContainer>
      }
    >
      <StyledInput {...props} placeholder="Search" value={value} onChange={handleChange} />
    </StyledInputGroup>
  );
};

export default SearchInput;
