import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useEffect, useState } from 'react';

function useNotifications() {
  const [notifToken, setNotifToken] = useState('');
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return undefined;
      }

      try {
        const token = await Notifications.getExpoPushTokenAsync();
        setNotifToken(token);
      } catch (error) {
        console.error(error);
      }

      console.log(finalStatus);
    };
    registerForPushNotificationsAsync();
  }, []);

  return { notifToken };
}

export default useNotifications;
