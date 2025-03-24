import { useReactiveVar } from '@apollo/client';
import i18n from '@shared/i18n/config';

import { Notification } from './Notification';
import { StyledNotificationsBox } from './Notifications.style';
import { dismissNotification, notificationsVar } from './notifications-var';

export const Notifications = () => {
  const notifications = useReactiveVar(notificationsVar);

  return (
    <StyledNotificationsBox language={i18n.language}>
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
