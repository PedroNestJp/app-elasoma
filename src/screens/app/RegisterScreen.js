import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import {updateUserService} from '../../services/users';
import KeyboardAvoidingView from '../../components/Containers/KeyboardAvoidingView';
import {getStatesService} from '../../services/states';
import {notifyError} from '../../helpers/notifications';
import PersonalDataForm from '../../containers/forms/PersonalDataForm';
import {userHasInterests} from '../../helpers/store';
import {Screens} from '../../contants/screens';

export default ({navigation}) => {
  const [loading, isLoading] = useState(false);
  const {user} = useSelector(state => state.auth);

  const submitForm = async values => {
    try {
      isLoading(true);
      await updateUserService(user.id, values);
      if (!userHasInterests()) {
        navigation.navigate(Screens.NEWS.navigator, {
          screen: Screens.NEWS.INTERESTS_SCREEN,
        });
      } else {
        navigation.navigate('Home');
      }
      isLoading(false);
    } catch (e) {
      isLoading(false);
      notifyError(e);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollContainer>
        <View style={{marginBottom: 50}}>
          <PersonalDataForm loading={loading} onSubmit={submitForm} />
        </View>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};
