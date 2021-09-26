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
  const [eventsReminder, setEventsRemider] = useState(true);
  const user = getUserFromStore();
  const topicName = `eventsReminder${user.state}`;

  useEffect(() => {
    getNotificationsState();
  }, []);

  const getNotificationsState = async () => {
    isLoading(true);
    const eventsNotificationState = await AsyncStorage.getItem(
      `${STORAGE_PREFIX}${topicName}`,
    );

    setEventsRemider(eventsNotificationState === 'true');
    isLoading(false);
  };

  const handleEventsNotifications = async notificationState => {
    await AsyncStorage.setItem(
      `${STORAGE_PREFIX}${topicName}`,
      notificationState.toString(),
    );
    setEventsRemider(notificationState);

    if (notificationState) {
      await subscribeToTopic(topicName);
    } else {
      await unsubscribeFromTopic(topicName);
    }
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      <FormItem style={styles.formItem}>
        <Text>Lembrar evento quando estiver próximo</Text>
        <View>
          <Switch value={eventsReminder} onChange={handleEventsNotifications} />
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
