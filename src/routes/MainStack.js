import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Screens} from '../contants/screens';
import App from './App';
import News from './News';
import Events from './Events';
import Affiliated from './Affiliated';
import DiscountsClub from './DiscountsClub';
import Forum from './Forum';
import Notifications from './Notifications';

const Stack = createStackNavigator();
const showHeader = false;

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.APP.navigator}
        component={App}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.NEWS.navigator}
        component={News}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.EVENTS.navigator}
        component={Events}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.AFFILIATED.navigator}
        component={Affiliated}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.DISCOUNTS_CLUB.navigator}
        component={DiscountsClub}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.FORUM.navigator}
        component={Forum}
      />
      <Stack.Screen
        options={{headerShown: showHeader}}
        name={Screens.NOTIFICATIONS.navigator}
        component={Notifications}
      />
    </Stack.Navigator>
  );
};
