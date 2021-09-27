import React from 'react';
import {firebase} from '@react-native-firebase/auth';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import {createNewUser, updateUserService} from '../users';
import {syncUserInfo} from './auth';
import {AuthActions} from '../../redux/actions';
import {store} from '../../redux/configureStore';

const getPermissions = async () => {
  return await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [
      AppleAuthRequestScope.EMAIL,
      AppleAuthRequestScope.FULL_NAME,
    ],
  });
};

const getAppleCredential = ({identityToken, nonce}) => {
  return firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
};

export const loginWithAppleService = async () => {
  const {identityToken, nonce} = await getPermissions();
  if (identityToken) {
    const appleCredential = getAppleCredential({identityToken, nonce});
    const {
      additionalUserInfo,
      user,
    } = await firebase.auth().signInWithCredential(appleCredential);

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
  } else {
    throw 'Erro ao realizar login com a Apple';
  }
};
