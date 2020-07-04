import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  HiddenItem,
  OverflowMenu
} from 'react-navigation-header-buttons';

import Bold from './component/Font/Bold';
import LogoTitle from './component/LogoTitle';
import { setIsUserLogin } from './context/action/user';
import { UserStore } from './context/store/user';
import colors from './utils/colors';
import Details from './views/Details';
import Home from './views/Home/Home';

const IoniconsHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

const Stack = createStackNavigator();

export default function AppStack() {
  const { userState, dispatch } = useContext(UserStore);

  const disconnect = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsUserLogin(dispatch, false);
    } catch (err) {
      console.log(err.message);
    }
  };

  // TODO: center le tout dans le header

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: colors['stroke-default-planning']
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Bold
              style={{
                marginRight: 10,
                color: colors['active-white']
              }}
            >
              {userState.user.lastname}
            </Bold>
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <OverflowMenu OverflowIcon={<Ionicons name="md-contact" size={23} color="white" />}>
                <HiddenItem title="Deconnexion" onPress={() => disconnect()} />
              </OverflowMenu>
            </HeaderButtons>
          </View>
        )
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerBackTitleStyle: {
            color: colors['active-white']
          },
          headerBackTitle: 'Retour',
          headerTitle: null
        }}
      />
    </Stack.Navigator>
  );
}
