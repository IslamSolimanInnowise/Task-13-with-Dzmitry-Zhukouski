import { createListCollection, Portal, Select } from '@chakra-ui/react';

import {
  StyledIndicator,
  StyledItem,
  StyledPositioner,
  StyledTrigger,
  StyledValueText,
} from './customSelect.styles';

type CustomSelectProps = {
  placeholderText: string;
  itemsList?: { id: string; name: string }[];
  isReadOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

const CustomSelect = ({
  itemsList,
  placeholderText,
  isReadOnly,
  value,
  onChange,
}: CustomSelectProps) => {
  const list = createListCollection({
    items: itemsList
      ? itemsList.map((item) => ({ label: item.name, value: item.id }))
      : [],
  });

  const selectedItem = list.items.find((item) => item.value === value);

  return (
    <Select.Root
      collection={list}
      readOnly={isReadOnly}
      value={value ? [value] : []}
      onValueChange={(e) => onChange?.(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <StyledTrigger>
          <StyledValueText placeholder={placeholderText}>
            {selectedItem ? selectedItem.label : placeholderText}
          </StyledValueText>
        </StyledTrigger>
        <Select.IndicatorGroup>
          <StyledIndicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <StyledPositioner style={{ zIndex: 9999 }}>
          <Select.Content>
            {list.items.map((someItem) => (
              <StyledItem item={someItem} key={someItem.value}>
                {someItem.label}
                <Select.ItemIndicator />
              </StyledItem>
            ))}
          </Select.Content>
        </StyledPositioner>
      </Portal>
    </Select.Root>
  );
};

export default CustomSelect;
