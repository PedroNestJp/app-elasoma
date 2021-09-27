import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Screens} from '../contants/screens';
import DiscountsClubScreen from '../screens/discounts_club/DiscountsClubScreen';
import DiscountDetailsScreen from '../screens/discounts_club/DiscountDetailsScreen';
import DiscountMapDetailsScreen from '../screens/discounts_club/DiscountMapDetailsScreen';
import DiscountCategoriesScreen from '../screens/discounts_club/DiscountCategoriesScreen';
import DiscountCreateScreen from '../screens/discounts_club/DiscountCreateScreen';

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
        name={Screens.DISCOUNTS_CLUB.DISCOUNTS_CLUB_SCREEN}
        component={DiscountsClubScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.DISCOUNTS_CLUB.DISCOUNT_DETAILS_SCREEN}
        component={DiscountDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.DISCOUNTS_CLUB.DISCOUNT_MAP_DETAILS_SCREEN}
        component={DiscountMapDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.DISCOUNTS_CLUB.DISCOUNT_CATEGORIES_SCREEN}
        component={DiscountCategoriesScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screens.DISCOUNTS_CLUB.DISCOUNT_CREATE_DISCOUNT_SCREEN}
        component={DiscountCreateScreen}
      />
    </Stack.Navigator>
  );
};
