/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name} from './app.ios.json';
import React from 'react';
import {initNotification} from './src/services/notifications/notifications';

initNotification();
/**
 * @return {null}
 */
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(name, () => HeadlessCheck);
