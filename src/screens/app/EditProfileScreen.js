import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import { useSelector } from 'react-redux';
import UpdatableUserPicture from '../../containers/user/UpdatableUserPicture';
import PersonalDataForm from '../../containers/forms/PersonalDataForm';
import { updateUserService } from '../../services/users';
import { notifyError, showToastSuccess } from '../../helpers/notifications';
import KeyboardAvoidingView from '../../components/Containers/KeyboardAvoidingView';

const PasswordResetScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { photoURL, interests, ...userData } = values;  // Desestruturação
      await updateUserService(user.id, userData);
      showToastSuccess('Dados atualizados');
      navigation.goBack();
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
      <ScrollContainer canGoBack>
        <View style={styles.lockerContainer}>
          <UpdatableUserPicture width={100} height={100} />
        </View>
        <View style={styles.textContainer}>
          <PersonalDataForm loading={loading} onSubmit={handleSubmit} />
        </View>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
});

export default PasswordResetScreen;
