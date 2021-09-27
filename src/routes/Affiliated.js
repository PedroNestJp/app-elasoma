import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import AffiliatedScreen from '../screens/affiliated/AffiliatedScreen';
import AffiliatedDetailsScreen from '../screens/affiliated/AffiliatedDetailsScreen';

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
        name={Screens.AFFILIATED.AFFILIATED_SCREEN}
        component={AffiliatedScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.AFFILIATED.AFFILIATED_DETAILS}
        component={AffiliatedDetailsScreen}
      />
    </Stack.Navigator>
  );
};
