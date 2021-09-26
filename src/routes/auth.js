import React, {useContext, useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import SplashScreen from '../screens/auth/SplashScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import LinkSocial from '../screens/auth/LinkSocial';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RightDrawer from './RightDrawer';
import {getUserFromStore} from '../helpers/store';
import IsSuspendedScreen from '../screens/auth/IsSuspendedScreen';
import {ThemeContext} from 'styled-components';
import {isReadyRef, navigationRef} from './helpers';
import {canUserAccessSystem} from '../services/users';

const Stack = createStackNavigator();

export default () => {
  const {isLoading, authenticated} = useSelector(state => state.auth);
  const {theme} = useSelector(state => state.appConfig);
  const themeContext = useContext(ThemeContext);
  const user = getUserFromStore();

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: theme === 'dark',
        colors: {
          ...DefaultTheme.colors,
          background: themeContext.containerBackground,
        },
      }}
      onReady={() => {
        isReadyRef.current = true;
      }}
      ref={navigationRef}>
      <Stack.Navigator>
        {isLoading && (
          <Stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={SplashScreen}
          />
        )}
        {!authenticated && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="LinkSocial"
              component={LinkSocial}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </>
        )}

        {authenticated && !canUserAccessSystem() && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="IsSuspendedScreen"
              component={IsSuspendedScreen}
            />
          </>
        )}

        {authenticated && !user.isSuspended && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="RightDrawer"
              component={RightDrawer}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
