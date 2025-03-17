import { createListCollection, Portal, Select } from '@chakra-ui/react';

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
        <Select.Trigger style={{ cursor: 'pointer' }}>
          <Select.ValueText
            placeholder={placeholderText}
            style={{ paddingLeft: '1rem' }}
          >
            {selectedItem ? selectedItem.label : placeholderText}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator style={{ paddingRight: '0.5rem' }} />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner style={{ zIndex: 9999 }}>
          <Select.Content>
            {list.items.map((someItem) => (
              <Select.Item
                item={someItem}
                key={someItem.value}
                style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}
              >
                {someItem.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default CustomSelect;
