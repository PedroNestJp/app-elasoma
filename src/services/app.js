import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';
import {catchError} from '../helpers/errors';
import {isReadyRef, navigationRef} from '../routes/helpers';

export const setRouteToGoAfterOpenTheApp = async data => {
  console.log('App configurado para abrir em:', data);
  await AsyncStorage.setItem('routeToGoAfterOpenApp', JSON.stringify(data));
};

export const getRouteToGoAfterOpenTheApp = async () => {
  const route = await AsyncStorage.getItem('routeToGoAfterOpenApp');

  if (route) {
    await AsyncStorage.removeItem('routeToGoAfterOpenApp');
    return JSON.parse(route);
  }

  return null;
};

export const appAlreadyBeenOpened = async () => {
  return (await AsyncStorage.getItem('appWasAlreadyOpened')) !== null;
};

export const setAppAsOpened = async () => {
  return await AsyncStorage.setItem(
    'appWasAlreadyOpened',
    JSON.stringify(new Date()),
  );
};

export const setAppAsNeverOpened = async () => {
  return await AsyncStorage.removeItem('appWasAlreadyOpened');
};

export const initSentry = () => {
  Sentry.init({
    dsn:
      'https://648036cced384296b818a10cee9bf380@o354773.ingest.sentry.io/2675785',
  });
};

export const navigateFromRef = (navigator, route) => {
  const navigationQueue = setInterval(navigate, 1000);

  function navigate() {
    console.log('Vai tentar navegar para uma rota', route);
    try {
      if (isReadyRef.current && navigationRef.current) {
        clearInterval(navigationQueue);
        navigationRef.current.navigate(navigator, route);
      }
    } catch (e) {
      catchError(e);
    }
  }
};
