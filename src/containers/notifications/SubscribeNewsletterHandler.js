import React, {useState} from 'react';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import FormItem from '../../components/Form/FormItem';
import Switch from '../../components/Switch';
import {getUserFromStore} from '../../helpers/store';
import ViewContainer from '../../components/Containers/ViewContainer';
import {updateUserService} from '../../services/users';
import {showToastError, showToastSuccess} from '../../helpers/notifications';

export default () => {
  const user = getUserFromStore();
  const [isSubscribedToNewsletter, subscribeNewsletter] = useState(
    !user.isSubscribedToNewsletter || false,
  );

  const handleNewsletterSubscription = async isSubscribedToNewsletter => {
    try {
      subscribeNewsletter(isSubscribedToNewsletter);
      await updateUserService(user.id, {isSubscribedToNewsletter});

      const text = isSubscribedToNewsletter
        ? 'Você receberá notificações sobre este tópico'
        : 'Você não mais receberá notificações sobre este tópico';

      showToastSuccess(text);
    } catch (e) {
      showToastError('Houve um problema. Tente novamente mais tarde');
    }
  };

  return (
    <ViewContainer noPaddingHorizontal>
      <FormItem style={styles.formItem}>
        <Text>Receber newsletter por email</Text>
        <View>
          <Switch
            value={isSubscribedToNewsletter}
            onChange={handleNewsletterSubscription}
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
