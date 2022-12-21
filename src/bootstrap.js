import {store} from './redux/configureStore';
import {StateActions} from './redux/actions';
import {notificationSettings} from './services/notifications/notifications';
import {subscribeToAllNotifications} from './services/notifications/userNotifications';

export default async ({navigation}) => {
  store.dispatch(StateActions.getStates());
  await notificationSettings();
  await subscribeToAllNotifications();
};
