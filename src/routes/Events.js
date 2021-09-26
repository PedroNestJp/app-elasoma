import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import EventsScreen from '../screens/events/EventsScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import EventMapDetailsScreen from '../screens/events/EventMapDetailsScreen';
import EventsConfirmedPeople from '../screens/events/EventsConfirmedPeople';
import EventsGallery from '../screens/events/EventsGallery';

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
        name={Screens.EVENTS.EVENTS_SCREEN}
        component={EventsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.EVENTS.EVENT_DETAILS_SCREEN}
        component={EventDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.EVENTS.EVENT_MAP_DETAILS_SCREEN}
        component={EventMapDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.EVENTS.EVENT_CONFIRMED_PEOPLE_SCREEN}
        component={EventsConfirmedPeople}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.EVENTS.EVENT_GALLERY_SCREEN}
        component={EventsGallery}
      />
    </Stack.Navigator>
  );
};
