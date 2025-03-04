import { Toaster, toaster } from '@shared/ui/toaster';
import { useEffect } from 'react';

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => onDismiss(id), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  toaster.create({
    title,
    description: message,
    type,
    action: {
      label: 'X',
      onClick: () => {},
    },
  });

  return <Toaster />;
};
