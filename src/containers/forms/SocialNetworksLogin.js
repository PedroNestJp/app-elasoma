import React, {useState} from 'react';
import Button from '../../components/Buttons/Button';
import {Alert, StyleSheet, View, Platform} from 'react-native';
import {AppleButton} from '@invertase/react-native-apple-authentication';

import {
  getFacebookCredential,
  getFacebookEmail,
  loginWithFacebookService,
} from '../../services/auth/facebook_auth';
import {loginWithGoogleService} from '../../services/auth/google_auth';
import {Screens} from '../../contants/screens';
import {loginWithAppleService} from '../../services/auth/apple_auth';
import ViewContainer from '../../components/Containers/ViewContainer';
import {useSelector} from 'react-redux';

export default ({loading, navigation}) => {
  const [loadingGoogle, isLoadingGoogle] = useState(false);
  const [loadingFacebook, isLoadingFacebook] = useState(false);
  const [loadingApple, isLoadingApple] = useState(false);
  const {theme} = useSelector(state => state.appConfig);

  const loginWithGoogle = async () => {
    try {
      isLoadingGoogle(true);
      await loginWithGoogleService();
    } catch (e) {
      isLoadingGoogle(false);
      console.log(e);
    }
  };

  const loginWithFacebook = async () => {
    try {
      isLoadingFacebook(true);
      await loginWithFacebookService();
    } catch (e) {
      isLoadingFacebook(false);
      if (e.code === 'auth/account-exists-with-different-credential') {
        addFacebookLoginProvider(e.email);
      }
    }
  };

  const loginWithApple = async () => {
    try {
      isLoadingApple(true);
      await loginWithAppleService();
    } catch (e) {
      isLoadingApple(false);
      console.log('erro ao entrar', e);
    }
  };

  const addFacebookLoginProvider = email => {
    Alert.alert(
      'Você já está cadastrado com outra rede.',
      'Para habilitarmos o seu perfil precisamos que faça o login com sua rede original' +
        email,
      [
        {
          text: 'Prosseguir',
          onPress: accountAddProvider,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const accountAddProvider = async () => {
    const credential = await getFacebookCredential();
    const email = await getFacebookEmail();
    if (email) {
      navigation.navigate('LinkSocial', {email, credential});
    }
  };

  if (loading || loadingFacebook || loadingGoogle || loadingApple)
    return <ViewContainer loading />;

  return (
    <>
      <View style={{marginTop: 14}}>
        <Button
          disabled={loading || loadingFacebook || loadingGoogle || loadingApple}
          loading={loadingFacebook}
          onPress={loginWithFacebook}
          style={styles.facebookButton}
          textColor={'#ffffff'}
          size="large"
          text="Facebook"
        />
      </View>
      <View style={{marginTop: 14}}>
        <Button
          loading={loadingGoogle}
          onPress={loginWithGoogle}
          disabled={loading || loadingFacebook || loadingGoogle || loadingApple}
          textColor={'#ffffff'}
          style={styles.googleButton}
          size="large"
          text="Google"
        />
      </View>
      {Platform.OS === 'ios' && parseInt(Platform.Version) >= 13 ? (
        <View style={{marginTop: 14}}>
          <AppleButton
            buttonStyle={
              theme === 'light'
                ? AppleButton.Style.BLACK
                : AppleButton.Style.WHITE
            }
            buttonType={AppleButton.Type.CONTINUE}
            style={{
              height: 58,
            }}
            cornerRadius={20}
            onPress={loginWithApple}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  googleButton: {
    backgroundColor: '#D44638',
  },
  iosButton: {
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 0.5,
  },
});
