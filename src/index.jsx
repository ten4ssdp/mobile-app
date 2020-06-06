import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useContext } from 'react';
import { AsyncStorage, Alert, View } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  HiddenItem,
  OverflowMenu
} from 'react-navigation-header-buttons';

import Bold from './component/Font/Bold';
import LogoTitle from './component/LogoTitle';
import { setUser, signoutUser } from './context/action/user';
import { UserStore } from './context/store/user';
import colors from './utils/colors';
import Login from './views/Auth/Login';
import Home from './views/Home/Home';

const IoniconsHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

const Stack = createStackNavigator();

export default function AppStack() {
  const [token, setToken] = useState(null);

  const { userState, dispatch } = useContext(UserStore);

  async function getToken() {
    try {
      const tokenFound = await AsyncStorage.getItem('token');
      setToken(tokenFound);
      const decoded = jwtDecode(tokenFound);
      setUser(dispatch, decoded);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  async function removeToken() {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  useEffect(() => {
    getToken();
  }, [userState.isLogin]);

  // TODO: center le tout dans le header
  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: colors['stroke-default-planning']
            },
            headerRight: () => (
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <Bold style={{ marginRight: 10, color: colors['active-white'] }}>
                  {userState.user.lastname} {userState.user.name}
                </Bold>
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                  <OverflowMenu
                    OverflowIcon={<Ionicons name="md-contact" size={23} color="white" />}
                  >
                    <HiddenItem title="Deconnexion" onPress={() => Alert.alert('Deconnexion')} />
                  </OverflowMenu>
                </HeaderButtons>
              </View>
            )
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
