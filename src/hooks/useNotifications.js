import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useEffect, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { UserStore } from '../context/store/user';
import http from '../utils/http';

function useNotifications() {
  const [notifToken, setNotifToken] = useState('');
  const { userState } = useContext(UserStore);

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
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
          authorization: `bearer ${userToken}`
        };
        const token = await Notifications.getExpoPushTokenAsync();
        setNotifToken(token);
        console.log(token);

        if (!userState.user.id) {
          return;
        }

        const isSuscribed = await http.post(
          'notifications/subscribe',
          {
            userId: userState.user.id,
            token
          },
          { headers }
        );
        if (isSuscribed.result.includes('success')) {
          setNotifToken(token);
        }
      } catch (error) {
        console.error(error);
      }
    };
    registerForPushNotificationsAsync();
  }, [userState.user.id]);

  return { notifToken };
}

export default useNotifications;
