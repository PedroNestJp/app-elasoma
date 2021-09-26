import {createUserInfoListenerService} from '../users';
import {firebase} from '@react-native-firebase/auth';
import {AuthActions} from '../../redux/actions';
import {store} from '../../redux/configureStore';

export const getAuthState = () => {
  firebase.auth().onAuthStateChanged(async loggedUser => {
    if (loggedUser) {
      await syncUserInfo(loggedUser.uid);
    } else {
      store.dispatch(AuthActions.userLoggedOut());
    }
  });
};

export const syncUserInfo = userId => {
  createUserInfoListenerService(userId, user => {
    store.dispatch(AuthActions.userLoggedIn(user));
  });
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    store.dispatch(AuthActions.userLoggedOut());
  } catch (e) {
    store.dispatch(AuthActions.userLoggedOut());
  }
};
