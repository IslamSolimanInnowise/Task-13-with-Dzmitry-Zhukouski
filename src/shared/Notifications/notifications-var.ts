import { makeVar } from '@apollo/client';

export type Notification = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

export const notificationsVar = makeVar<Notification[]>([]);

export const addNotification = (notification: Omit<Notification, 'id'>) => {
  notificationsVar([
    ...notificationsVar(),
    { id: crypto.randomUUID(), ...notification },
  ]);
};

export const dismissNotification = (id: string) => {
  notificationsVar(notificationsVar().filter((n) => n.id !== id));
};
