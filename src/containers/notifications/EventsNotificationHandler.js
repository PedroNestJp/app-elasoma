import React, {useEffect, useState} from 'react';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import FormItem from '../../components/Form/FormItem';
import AsyncStorage from '@react-native-community/async-storage';
import Switch from '../../components/Switch';
import {getUserFromStore} from '../../helpers/store';
import {
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../../services/notifications/notifications';
import ViewContainer from '../../components/Containers/ViewContainer';

const STORAGE_PREFIX = '@elasoma';

export default () => {
  const [loading, isLoading] = useState(true);
  const [eventsNotification, setEventsNotification] = useState(true);
  const user = getUserFromStore();

  useEffect(() => {
    getNotificationsState();
  }, []);

  const getNotificationsState = async () => {
    isLoading(true);
    await getEventsNotificationState();

    isLoading(false);
  };

  const getEventsNotificationState = async () => {
    const eventsNotificationState = await AsyncStorage.getItem(
      `${STORAGE_PREFIX}Notifications`,
    );

    setEventsNotification(eventsNotificationState === 'true');
  };

  const handleEventsNotifications = async notificationState => {
    await AsyncStorage.setItem(
      `${STORAGE_PREFIX}Notifications`,
      notificationState.toString(),
    );
    setEventsNotification(notificationState);

    if (notificationState) {
      await subscribeToTopic(`eventsNotifications${user.state}`);
    } else {
      await unsubscribeFromTopic(`eventsNotifications${user.state}`);
    }
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      <FormItem style={styles.formItem}>
        <Text>Aviso de Eventos</Text>
        <View>
          <Switch
            value={eventsNotification}
            onChange={handleEventsNotifications}
          />
        </View>
      </FormItem>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
