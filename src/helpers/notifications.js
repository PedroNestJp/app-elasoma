import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

import errorsMessages, {logoutFlags} from '../contants/errorsMessages';
import {signOut} from '../services/auth/auth';

export const notifyError = ({title, key, code, message}) => {
  const errorMessage = errorsMessages[key] || errorsMessages[code] || message;

  errorMessage &&
    Alert.alert(title, errorMessage, [
      {
        text: 'Ok',
        onPress: () => needsLogout({key, code}),
        style: 'cancel',
      },
    ]);
};

export const notifySuccess = ({title, message}) => {
  Alert.alert(title, message, [
    {
      text: 'Ok',
      style: 'cancel',
    },
  ]);
};

export const needsLogout = ({key, code}) => {
  if (logoutFlags.includes(key) || logoutFlags.includes(code)) signOut();
};

export const showToastSuccess = text => {
  Toast.show(text);
};

export const showToastError = text => {
  Toast.show(text);
};
