import {createDocListener, getDoc, setDoc, updateDoc} from './common/firestore';
import rolesEnum from '../models/rolesEnum';
import {setAppAsNeverOpened} from './app';
import {getUserFromStore} from '../helpers/store';
import {firestoreTimeToMoment} from '../helpers/common';
import moment from 'moment';

const USER_PATH = userId => `users/${userId}`;

export const createNewUser = async user => {
  const userData = {
    name: user.displayName || '',
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    id: user.uid,
    uid: user.uid,
    role: rolesEnum.USER,
    isSuspended: true,
    lastSignInTime: new Date(user.metadata.lastSignInTime),
    creationTime: new Date(user.metadata.creationTime),
  };

  await setAppAsNeverOpened();

  return await setDoc(USER_PATH(userData.id), userData);
};

export const updateUserService = async (userId, data) => {
  if (data.city && data.state) {
    const city = await getDoc(`states/${data.state}/cities/${data.city}`);
    data.cityName = city.name;
  }

  if (data.state) {
    const state = await getDoc(`states/${data.state}`);
    data.stateUf = state.uf;
  }

  return await updateDoc(USER_PATH(userId), data);
};

export const createUserInfoListenerService = (userId, callback) => {
  return createDocListener(USER_PATH(userId), async data => {
    const user = await mountUser(data);
    callback(user);
  });
};

const mountUser = async userData => {
  if (userData.state) {
    userData.stateData = await getDoc(`states/${userData.state}`);
  }
  return userData;
};

export const canUserAccessSystem = () => {
  const user = getUserFromStore();
  return !user.isSuspended && isValidToday();
};

export const isValidToday = () => {
  const user = getUserFromStore();

  if (!user.validity) {
    return true;
  }

  const validityDate = firestoreTimeToMoment(user.validity);
  const today = new moment();

  return today.isBefore(validityDate);
};

export const getAccountSuspendedMessage = () => {
  const user = getUserFromStore();

  if (user.isSuspended) {
    return {
      title: 'Aguarde 1 dia útil para aprovação do administrador.',
      description: 'Após essa validação você poderá acessar o aplicativo.',
    };
  }

  if (!isValidToday()) {
    return {
      title: 'Sua vigência de filiação com o Soma está cancelada.',
      description:
        'Entre em contato com a administração do Soma para renovação.',
    };
  }

  return {
    title: 'Aguarde 1 dia útil para aprovação do administrador.',
    description: 'Após essa validação você poderá acessar o aplicativo.',
  };
};
