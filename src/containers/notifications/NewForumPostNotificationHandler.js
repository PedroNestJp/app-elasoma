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
  const [newForumPostNotifications, setNewForumPostNotifications] = useState(
    true,
  );
  const user = getUserFromStore();

  useEffect(() => {
    getNotificationsState();
  }, []);

  const getNotificationsState = async () => {
    isLoading(true);
    await getNewForumPostNotificationState();

    isLoading(false);
  };

  const getNewForumPostNotificationState = async () => {
    const eventsNotificationState = await AsyncStorage.getItem(
      `${STORAGE_PREFIX}NewForumPostsNotifications`,
    );

    setNewForumPostNotifications(eventsNotificationState === 'true');
  };

  const handleEventsNotifications = async notificationState => {
    await AsyncStorage.setItem(
      `${STORAGE_PREFIX}NewForumPostsNotifications`,
      notificationState.toString(),
    );
    setNewForumPostNotifications(notificationState);

    if (notificationState) {
      await subscribeToTopic(`newForumPostNotifications${user.state}`);
    } else {
      await unsubscribeFromTopic(`newForumPostNotifications${user.state}`);
    }
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      <FormItem style={styles.formItem}>
        <Text>Notificar respostas no Fórum</Text>
        <View>
          <Switch
            value={newForumPostNotifications}
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
