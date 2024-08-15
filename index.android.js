import 'react-native-reanimated';
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name} from './app.android.json';
import {initNotification} from './src/services/notifications/notifications';

initNotification();

AppRegistry.registerComponent(name, () => App);
