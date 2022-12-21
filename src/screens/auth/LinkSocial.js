import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {signInWithGoogle} from '../../services/auth/google_auth';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/Buttons/Button';
import {fireAuth} from '../../config/firebase';
import {syncUserInfo} from '../../services/auth/auth';
import {AuthActions} from '../../redux/actions';
import Brand from '../../components/Brand';

export default ({route}) => {
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  const [provider, setProvider] = useState(null);

  const {email, credential} = route.params;

  useEffect(() => {
    fetchProviders();
  }, [email]);

  const fetchProviders = async () => {
    try {
      const providers = await fireAuth.fetchSignInMethodsForEmail(email);
      setProvider(providers[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useCallback(async () => {
    try {
      isLoading(true);
      const {user} = await signInWithGoogle();
      await fireAuth.currentUser.linkWithCredential(credential);
      dispatch(AuthActions.isAuthenticated());
      syncUserInfo(user.uid);
    } catch (error) {
      console.log(error);
      isLoading(false);
    }
  }, []);

  return (
    <ScrollContainer loading={!provider}>
      <View style={styles.brandContainer}>
        <Brand height={15.17} />
      </View>
      {provider && (
        <Text style={styles.separator}>Você já tem uma conta conosco.</Text>
      )}
      {provider === 'google.com' && (
        <View style={styles.separator}>
          <Text>
            Você já usou o email: {email}. Entre com sua conta do Google para
            continuarmos
          </Text>
          <View style={styles.separator}>
            <Button
              loading={loading}
              onPress={handleGoogleLogin}
              style={styles.googleButton}
              size="large"
              text="Google"
            />
          </View>
        </View>
      )}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  googleButton: {
    backgroundColor: '#D44638',
  },
  brandContainer: {
    paddingTop: 40,
  },
  separator: {
    marginTop: 30,
  },
});
