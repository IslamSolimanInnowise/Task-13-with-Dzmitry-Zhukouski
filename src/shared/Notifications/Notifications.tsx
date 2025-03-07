import { useReactiveVar } from '@apollo/client';

import { Notification } from './Notification';
import { StyledNotificationsBox } from './Notifications.style';
import { dismissNotification, notificationsVar } from './notifications-var';

export const Notifications = () => {
  const notifications = useReactiveVar(notificationsVar);

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
