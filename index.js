import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appIosName} from './app.ios.json';
import {name as appAndroidName} from './app.android.json';
import React from 'react';
import {initSentry} from './src/services/app';
import {initNotification} from './src/services/notifications/notifications';

const appName = Platform.OS === 'ios' ? appIosName : appAndroidName;

initNotification();

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
