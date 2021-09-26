import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import ForumScreen from '../screens/forum/ForumScreen';
import ForumCreatePostScreen from '../screens/forum/ForumCreatePostScreen';
import ForumPostDetailsScreen from '../screens/forum/ForumPostDetailsScreen';

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
        name={Screens.FORUM.FORUM_SCREEN}
        component={ForumScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.FORUM.FORUM_CREATE_POST_SCREEN}
        component={ForumCreatePostScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.FORUM.FORUM_POST_DETAILS_SCREEN}
        component={ForumPostDetailsScreen}
      />
    </Stack.Navigator>
  );
};
