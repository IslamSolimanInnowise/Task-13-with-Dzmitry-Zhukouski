import {
  createListCollection,
  Portal,
  Select as ChakraSelect,
} from '@chakra-ui/react';

import {
  StyledIndicator,
  StyledItem,
  StyledItemGroup,
  StyledItemGroupLabel,
  StyledTrigger,
  StyledValueText,
} from './select.styles';

type SelectProps = {
  placeholderText: string;
  label?: string;
  itemsList?: { id: string; name: string; group?: string | null }[];
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
      ? itemsList.map((item) => ({
          label: item.name,
          value: item.id,
          group: item.group,
        }))
      : [],
  });

  const selectedItem = list.items.find((item) => item.value === value);

  const { groupedItems, ungroupedItems, othersItems } = list.items.reduce(
    (acc, item) => {
      if (item.group === undefined) {
        acc.ungroupedItems.push(item);
      } else if (item.group === null) {
        acc.othersItems.push(item);
      } else {
        const group = item.group;
        if (!acc.groupedItems[group]) {
          acc.groupedItems[group] = [];
        }
        acc.groupedItems[group].push(item);
      }
      return acc;
    },
    {
      groupedItems: {} as Record<string, typeof list.items>,
      ungroupedItems: [] as typeof list.items,
      othersItems: [] as typeof list.items,
    },
  );

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
        <ChakraSelect.Positioner maxHeight="40vh" style={{ zIndex: 9999 }}>
          <ChakraSelect.Content maxHeight="inherit">
            {ungroupedItems.map((item) => (
              <StyledItem item={item} key={item.value}>
                {item.label}
                <ChakraSelect.ItemIndicator />
              </StyledItem>
            ))}

            {Object.entries(groupedItems).map(([groupName, items]) => (
              <StyledItemGroup key={groupName}>
                <StyledItemGroupLabel>{groupName}</StyledItemGroupLabel>
                {items.map((item) => (
                  <StyledItem item={item} key={item.value}>
                    {item.label}
                    <ChakraSelect.ItemIndicator />
                  </StyledItem>
                ))}
              </StyledItemGroup>
            ))}
            {othersItems.length > 0 && (
              <StyledItemGroup>
                <StyledItemGroupLabel>Others</StyledItemGroupLabel>
                {othersItems.map((item) => (
                  <StyledItem item={item} key={item.value}>
                    {item.label}
                    <ChakraSelect.ItemIndicator />
                  </StyledItem>
                ))}
              </StyledItemGroup>
            )}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};

export default Select;
