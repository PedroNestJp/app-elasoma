import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {firebase} from '@react-native-firebase/auth';
import {createNewUser, updateUserService} from '../users';
import {syncUserInfo} from './auth';
import {AuthActions} from '../../redux/actions';
import {store} from '../../redux/configureStore';

const getPermissions = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw new Error('User cancelled the login process');
  }

  return result;
};

const getFacebookToken = async () => {
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw new Error('Something went wrong obtaining access token');
  }

  return data;
};

export const getFacebookCredential = async () => {
  await getPermissions();
  const {accessToken} = await getFacebookToken();

  return firebase.auth.FacebookAuthProvider.credential(accessToken);
};

export const loginWithFacebookService = async () => {
  const credential = await getFacebookCredential();
  const {additionalUserInfo, user} = await firebase
    .auth()
    .signInWithCredential(credential);

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

export const getFacebookEmail = () =>
  new Promise(resolve => {
    const infoRequest = new GraphRequest(
      '/me?fields=email',
      null,
      (error, result) => {
        if (error) {
          resolve(null);
          return;
        }

        if (result) {
          resolve(result.email);
        } else {
          resolve(null);
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  });
