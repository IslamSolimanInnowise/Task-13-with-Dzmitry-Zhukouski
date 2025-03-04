import { Box } from '@chakra-ui/react';

import { Notification } from './Notification';
import { useNotifications } from './notifications-store';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <Box
      position="fixed"
      right={4}
      top={4}
      zIndex={1300}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </Box>
  );
};
