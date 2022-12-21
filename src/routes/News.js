import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import InterestsScreen from '../screens/news/InterestsScreen';
import NewsDetail from '../screens/news/NewsDetail';
import SearchNewsScreen from '../screens/news/SearchNewsScreen';

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
        name={Screens.NEWS.INTERESTS_SCREEN}
        component={InterestsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.NEWS.NEWS_DETAIL}
        component={NewsDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.NEWS.SEARCH_NEWS}
        component={SearchNewsScreen}
      />
    </Stack.Navigator>
  );
};
