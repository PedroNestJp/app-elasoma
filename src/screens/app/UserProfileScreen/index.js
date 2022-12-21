import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '../../../components/Typography/Text';
import TextButton from '../../../components/Buttons/TextButton';
import ScrollContainer from '../../../components/Containers/ScrollContainer';
import UserPicture from '../../../components/LoggedUserPicture';

import {useSelector} from 'react-redux';

import {Container, Touchable} from './styles';

const UserProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <ScrollContainer
      canGoBack
      RightOptionsComp={() => (
        <TextButton
          icon="pencil"
          fontStyle="600"
          size={16}
          text="Editar "
          onPress={() => navigation.push('EditProfileScreen')}
        />
      )}>
      <View style={styles.lockerContainer}>
        <UserPicture width={213} height={213} />
      </View>

      <View style={styles.textContainer}>
        <Text style={{textAlign: 'center'}} size={22} fontStyle="bold">
          {user.name}
        </Text>
        <Text style={{textAlign: 'center'}} fontStyle={300}>
          {user.business}
        </Text>
        <Text style={{textAlign: 'center'}} fontStyle={300}>
          {user.cityName} / {user.stateUf}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={{textAlign: 'center'}} size={14}>
          {user.aboutMe}
        </Text>
      </View>

      <Container>
        <Text style={{textAlign: 'center'}} size={14}>
          para excluir sua conta permanentemente,{' '}
          <Touchable onPress={() => navigation.push('DeleteAccountScreen')}>
            <Text
              size={14}
              fontStyle="bold"
              style={{textDecorationLine: 'underline'}}>
              clique aqui
            </Text>
          </Touchable>{' '}
          para fechar sua conta
        </Text>
      </Container>
    </ScrollContainer>
  );
};

export default UserProfileScreen;

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
    marginVertical: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 25,
  },
  footerTextContainer: {
    marginVertical: 40,
  },
});
