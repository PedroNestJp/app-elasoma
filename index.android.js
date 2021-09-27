/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name} from './app.android.json';
import {initNotification} from './src/services/notifications/notifications';
import {initSentry} from './src/services/app';

initSentry();
initNotification();

AppRegistry.registerComponent(name, () => App);
