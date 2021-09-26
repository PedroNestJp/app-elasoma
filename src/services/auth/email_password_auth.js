import {firebase} from '@react-native-firebase/auth';
import {createNewUser, updateUserService} from '../users';
import {syncUserInfo} from './auth';
import {AuthActions} from '../../redux/actions';

export const createUserWithEmailAndPassword = async ({email, password}) => {
  const {
    additionalUserInfo,
    user,
  } = await firebase.auth().createUserWithEmailAndPassword(email, password);

  if (additionalUserInfo.isNewUser) {
    await createNewUser(user);
  }

  syncUserInfo(user.uid);

  store.dispatch(AuthActions.isAuthenticated());

  return await updateUserService(user.uid, {
    lastSignInTime: new Date(user.metadata.lastSignInTime),
    creationTime: new Date(user.metadata.creationTime),
    email,
  });
};

export const loginWithEmailAndPassword = async ({email, password}) => {
  const {user} = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  syncUserInfo(user.uid);

  store.dispatch(AuthActions.isAuthenticated());

  return await updateUserService(user.uid, {
    lastSignInTime: new Date(user.metadata.lastSignInTime),
    email,
  });
};

export const sendPasswordResetEmail = async ({email}) => {
  try {
    return await firebase.auth().sendPasswordResetEmail(email);
  } catch (e) {
    console.log(e);
  }
};
