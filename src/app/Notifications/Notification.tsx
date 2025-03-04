import { Alert, Box } from '@chakra-ui/react';
import { Slide } from '@chakra-ui/transition';
import { useEffect, useState } from 'react';

export type NotificationProps = {
  notification: {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setTimeout(() => onDismiss(id), 500);
    }, 50000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <Slide direction="bottom" in={open} style={{ zIndex: 10 }}>
      <Box mb={2} maxW="sm" w="100%">
        <Alert.Root status={type}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{title}</Alert.Title>
            <Alert.Description>{message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    </Slide>
  );
};
