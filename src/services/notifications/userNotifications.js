import {getUserFromStore} from '../../helpers/store';
import {appAlreadyBeenOpened, setAppAsOpened} from '../app';
import {updateUserService} from '../users';
import {subscribeToTopicSilently} from './notifications';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_PREFIX = '@elasoma';

export const subscribeToAllNotifications = async () => {
  const user = getUserFromStore();

  if (!(await appAlreadyBeenOpened())) {
    await Promise.all([
      subscribeToNewsletter(user),
      subscribeToPostNotifications(user),
      subscribeToFutureEventsReminder(user),
      subscribeToEventsReminderNotifications(user),
      subscribeToEventsNotifications(user),
    ]);

    await setAppAsOpened();
  }
};

const subscribeToNewsletter = async user => {
  await updateUserService(user.id, {isSubscribedToNewsletter: true});
};

const subscribeToPostNotifications = async user => {
  const topic = `newForumPostNotifications${user.state}`;
  await subscribeToTopicSilently(topic);
  await setSubscribedOnLocalStorage('NewForumPostsNotifications');
};

const subscribeToEventsReminderNotifications = async user => {
  const topic = `eventsReminder${user.state}`;
  await subscribeToTopicSilently(topic);
  await setSubscribedOnLocalStorage(topic);
};

const subscribeToEventsNotifications = async user => {
  const topic = `eventsNotifications${user.state}`;
  await subscribeToTopicSilently(topic);
  await setSubscribedOnLocalStorage('Notifications');
};

const subscribeToFutureEventsReminder = async user => {
  await updateUserService(user.id, {
    futureEventsReminderSubscription: true,
  });
};

const setSubscribedOnLocalStorage = async key => {
  await AsyncStorage.setItem(`${STORAGE_PREFIX}${key}`, true.toString());
};
