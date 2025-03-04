import { Notification } from './Notification';
import { StyledNotificationsBox } from './notifications.styles';
import { useNotifications } from './notifications-store';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <StyledNotificationsBox>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </StyledNotificationsBox>
  );
};
