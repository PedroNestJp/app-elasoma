import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import {useSelector} from 'react-redux';
import UpdatableUserPicture from '../../containers/user/UpdatableUserPicture';
import PersonalDataForm from '../../containers/forms/PersonalDataForm';
import {updateUserService} from '../../services/users';
import {notifyError, showToastSuccess} from '../../helpers/notifications';
import KeyboardAvoidingView from '../../components/Containers/KeyboardAvoidingView';

export default ({navigation}) => {
  const [loading, isLoading] = useState(false);

  const {user} = useSelector(state => state.auth);

  const onSubmit = async values => {
    try {
      isLoading(true);
      delete values.photoURL;
      delete values.interests;
      await updateUserService(user.id, values);
      showToastSuccess('Dados atualizados');
      navigation.goBack();
      isLoading(false);
    } catch (e) {
      isLoading(false);
      notifyError(e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollContainer canGoBack>
        <View style={styles.lockerContainer}>
          <UpdatableUserPicture width={100} height={100} />
        </View>
        <View style={styles.textContainer}>
          <PersonalDataForm loading={loading} onSubmit={onSubmit} />
        </View>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    paddingTop: 40,
  },
  formInput: {
    paddingTop: 45,
  },
  socialNetworkLoginContainer: {
    marginTop: 100,
  },
  lockerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerTextContainer: {
    marginVertical: 40,
  },
});
