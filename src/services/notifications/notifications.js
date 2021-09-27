import nativeMessaging from '@react-native-firebase/messaging';

import {getUserFromStore} from '../../helpers/store';
import {updateUserService} from '../users';
import {messaging} from '../../config/firebase';
import {showToastSuccess} from '../../helpers/notifications';
import {eventsNotifications} from './eventsNotifications';
import notificationTypes from './notificationTypes';
import {openForumPostOnNotification} from './forumNotifications';
import {setRouteToGoAfterOpenTheApp} from '../app';
import {catchError} from '../../helpers/errors';

export const notificationSettings = async () => {
  await requestUserPermission();
  await handleToken();
  notificationListener();
};

export async function requestUserPermission() {
  try {
    const {AuthorizationStatus} = nativeMessaging;
    const authStatus = await messaging.requestPermission();

    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      await requestUserPermission();
      console.log(
        'Usuária não está autorizada a receber notificações',
        authStatus,
      );
    }
  } catch (e) {
    catchError(e);
  }
}

const notificationListener = async () => {
  messaging.onNotificationOpenedApp(remoteMessage =>
    onOpenFromQuitState(remoteMessage),
  );
  messaging
    .getInitialNotification()
    .then(remoteMessage => onOpenFromQuitState(remoteMessage));
};

const onOpenFromQuitState = remoteMessage => {
  if (remoteMessage) {
    console.log(
      'Vai abrir o app em uma rota onOpenFromQuitState',
      remoteMessage,
    );
    const {data} = remoteMessage;
    if (data.type === notificationTypes.EVENTS) {
      eventsNotifications(data);
    }

    if (data.type === notificationTypes.NEW_FORUM_POST) {
      openForumPostOnNotification(data);
    }
    if (data.type === notificationTypes.FORUM_POST_REPLY) {
      openForumPostOnNotification(data);
    }
  }
};

const handleToken = async () => {
  const user = getUserFromStore();

  const fcmToken = await messaging.getToken();
  console.log('token', fcmToken);

  const notificationTokens = !user.notificationTokens
    ? []
    : user.notificationTokens;

  if (!notificationTokens.some(token => token.token === fcmToken)) {
    notificationTokens.push({token: fcmToken});
    await updateUserService(user.id, {notificationTokens});
  }
};

export const setNotificationBackgroundHandler = async () => {
  messaging.setBackgroundMessageHandler(async remoteMessage => {
    const {data} = remoteMessage;
    if (data.type) {
      await setRouteToGoAfterOpenTheApp(data);
    }
  });
};

export const subscribeToTopic = async topicName => {
  try {
    await messaging.subscribeToTopic(topicName);
    showToastSuccess('Você receberá notificações sobre este tópico');
  } catch (e) {
    console.log(e);
  }
};

export const unsubscribeFromTopic = async topicName => {
  try {
    await messaging.unsubscribeFromTopic(topicName);
    showToastSuccess('Você não mais receberá notificações sobre este tópico');
  } catch (e) {
    console.log(e);
  }
};

export const subscribeToTopicSilently = async topicName => {
  await messaging.subscribeToTopic(topicName);
};

export const initNotification = async () => {
  try {
    await setNotificationBackgroundHandler();
    console.log('Handler de notificações em backhround configurado');
  } catch (e) {
    console.log(
      'Houve um problema ao configurar o gandler de notificações em background',
      e.message,
    );
  }
};
