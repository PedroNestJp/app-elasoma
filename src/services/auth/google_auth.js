import {GoogleSignin} from '@react-native-community/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {createNewUser, updateUserService} from '../users';
import {AuthActions} from '../../redux/actions';
import {syncUserInfo} from './auth';
import {exp} from 'react-native-reanimated';

async function bootstrap() {
  await GoogleSignin.configure({
    scopes: [],
    webClientId:
      '27981024048-4thu5b11h4bqipo21fp9985abbmabeqj.apps.googleusercontent.com',
    iosClientId:
      '27981024048-s91obqlobue18opou3tn5t4j47leu3if.apps.googleusercontent.com',
  });
}

export const getGoogleCredential = async () => {
  const {accessToken, idToken} = await GoogleSignin.signIn();

  return firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
};

export const signInWithGoogle = async () => {
  await bootstrap();
  await GoogleSignin.hasPlayServices();
  const credential = await getGoogleCredential();

  return await firebase.auth().signInWithCredential(credential);
};

export const loginWithGoogleService = async () => {
  const {additionalUserInfo, user} = await signInWithGoogle();

  if (additionalUserInfo.isNewUser) {
    await createNewUser(user);
  }

  syncUserInfo(user.uid);

  store.dispatch(AuthActions.isAuthenticated());

  return await updateUserService(user.uid, {
    lastSignInTime: new Date(user.metadata.lastSignInTime),
    creationTime: new Date(user.metadata.creationTime),
    email: user.email,
  });
};
