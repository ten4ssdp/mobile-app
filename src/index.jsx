import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

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

  const { userState, disconnect } = useContext(UserStore);

  if(userState.loading === true){
    return <View><Bold>Loading</Bold></View>;
  }

  return (
    <Stack.Navigator>
      {userState.isLogin ? (
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
                    <HiddenItem title="Deconnexion" onPress={() => disconnect()} />
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
