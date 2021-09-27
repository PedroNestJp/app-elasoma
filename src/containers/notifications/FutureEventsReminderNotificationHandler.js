import React, {useState} from 'react';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import FormItem from '../../components/Form/FormItem';
import Switch from '../../components/Switch';
import {getUserFromStore} from '../../helpers/store';
import ViewContainer from '../../components/Containers/ViewContainer';
import {updateUserService} from '../../services/users';
import {showToastSuccess} from '../../helpers/notifications';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../redux/actions';

export default () => {
  const [loading, isLoading] = useState(false);
  const user = getUserFromStore();
  const dispatch = useDispatch();

  const handleEventsNotifications = async () => {
    try {
      isLoading(true);
      await updateUserService(user.id, {
        futureEventsReminderSubscription: !user.futureEventsReminderSubscription,
      });
      dispatch(
        AuthActions.userLoggedIn({
          ...user,
          futureEventsReminderSubscription: !user.futureEventsReminderSubscription,
        }),
      );
      showToastSuccess('Você receberá notificações sobre eventos futuros');
      isLoading(false);
    } catch (e) {
      showToastSuccess(
        'Houve um problema ao ativar esta notificações. Volte mais tarde',
      );
      isLoading(false);
    }
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      <FormItem style={styles.formItem}>
        <Text>Notificar eventos futuros</Text>
        <View>
          <Switch
            value={user.futureEventsReminderSubscription}
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
