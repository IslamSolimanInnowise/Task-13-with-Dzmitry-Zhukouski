import { Alert, CloseButton } from '@chakra-ui/react';
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

export const Notification: React.FC<NotificationProps> = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      onDismiss(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const handleClose = () => {
    setOpen(false);
    onDismiss(id);
  };

  return (
    <Alert.Root status={type} display={open ? 'flex' : 'none'} padding={2}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        {message && <Alert.Description>{message}</Alert.Description>}
      </Alert.Content>
      <CloseButton
        pos="relative"
        top="-2"
        insetEnd="-2"
        onClick={handleClose}
      />
    </Alert.Root>
  );
};
