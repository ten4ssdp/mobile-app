import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Login from './views/Auth/Login';

const AuthStack = createStackNavigator();

export default function LoginStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}
