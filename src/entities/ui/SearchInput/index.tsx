import { X } from 'lucide-react';

import {
  StyledEndElementContainer,
  StyledInput,
  StyledInputGroup,
  StyledSearchIcon,
  StyledXIconBox,
} from './searchInput.styles';

interface SearchInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  value: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChange,
  handleClear,
}) => {
  return (
    <StyledInputGroup
      startElement={<StyledSearchIcon size="24" />}
      endElement={
        <StyledEndElementContainer visibility={value.length ? 'visible' : 'hidden'}>
          {value.length && (
            <StyledXIconBox as="button" onClick={handleClear}>
              <X size="24" />
            </StyledXIconBox>
          )}
        </StyledEndElementContainer>
      }
    >
      <StyledInput placeholder="Search" value={value} onChange={handleChange} />
    </StyledInputGroup>
  );
};

export default SearchInput;
