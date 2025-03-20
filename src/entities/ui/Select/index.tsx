import {
  createListCollection,
  Portal,
  Select as ChakraSelect,
} from '@chakra-ui/react';

import {
  StyledIndicator,
  StyledItem,
  StyledTrigger,
  StyledValueText,
} from './select.styles';

type SelectProps = {
  placeholderText: string;
  label?: string;
  itemsList?: { id: string; name: string }[];
  isReadOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

const Select = ({
  placeholderText,
  label,
  itemsList,
  isReadOnly,
  value,
  onChange,
}: SelectProps) => {
  const list = createListCollection({
    items: itemsList
      ? itemsList.map((item) => ({ label: item.name, value: item.id }))
      : [],
  });

  const selectedItem = list.items.find((item) => item.value === value);

  return (
    <ChakraSelect.Root
      collection={list}
      readOnly={isReadOnly}
      value={value ? [value] : []}
      onValueChange={(e) => onChange?.(e.value[0])}
    >
      <ChakraSelect.HiddenSelect />
      {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}
      <ChakraSelect.Control>
        <StyledTrigger>
          <StyledValueText placeholder={placeholderText}>
            {selectedItem ? selectedItem.label : placeholderText}
          </StyledValueText>
        </StyledTrigger>
        <ChakraSelect.IndicatorGroup>
          <StyledIndicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner style={{ zIndex: 9999 }}>
          <ChakraSelect.Content>
            {list.items.map((someItem) => (
              <StyledItem item={someItem} key={someItem.value}>
                {someItem.label}
                <ChakraSelect.ItemIndicator />
              </StyledItem>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};

export default Select;
