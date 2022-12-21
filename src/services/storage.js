import {storage} from '../config/firebase';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid, Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {notifyError} from '../helpers/notifications';

export const getStorageRef = path => {
  return storage.ref(path);
};

export const downloadImageFromURL = async image => {
  if (Platform.OS === 'android') {
    return downloadImageFromURLOnAndroid(image);
  } else {
    return downloadImageFromURLOnIos(image);
  }
};
export const downloadImageFromURLOnAndroid = async ({url, fileName}) => {
  if (!(await hasAndroidPermission())) {
    notifyError({
      title: 'Precisamos da sua autorização para salvar este arquivo!',
    });
    throw 'Erro ao requisitar autorização para salvar arquivos no dispositivo';
  }

  const PictureDir = RNFetchBlob.fs.dirs.PictureDir;

  return RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      notification: true,
      useDownloadManager: true,
      title: fileName,
      description: 'Imagem de evento salva.',
      mediaScannable: true,
      path: PictureDir + '/elasoma',
    },
  }).fetch('GET', url);
};

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function downloadImageFromURLOnIos({url}) {
  return CameraRoll.save(url);
}
