import { useNotifications } from './notifications-store';

export const notify = useNotifications.getState().addNotification;
