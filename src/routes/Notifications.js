import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.NOTIFICATIONS.NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};
