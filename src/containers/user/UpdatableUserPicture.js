import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import UserPicture from '../../components/LoggedUserPicture';
import {getStorageRef} from '../../services/storage';
import {useSelector} from 'react-redux';
import {notifyError} from '../../helpers/notifications';
import {updateUserService} from '../../services/users';

const {SlideInMenu} = renderers;

export default ({width, height}) => {
  const {user} = useSelector(state => state.auth);
  const [opened, setOpened] = useState(false);
  const [loading, isLoading] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        const readGranted =
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED;
        const writeGranted =
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED;
        const cameraGranted =
          granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED;

        return readGranted && writeGranted && cameraGranted;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS permissions are handled differently
    }
  };

  const checkAndRequestPermission = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      notifyError({
        title: 'Permissão Negada',
        message:
          'O aplicativo precisa de permissão para acessar a galeria e a câmera.',
      });
      return false;
    }
    return true;
  };

  const useGallery = async () => {
    const hasPermission = await checkAndRequestPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Escolher imagem de Perfil',
      cropperCircleOverlay: true,
      mediaType: 'photo',
      includeBase64: true,
    });

    await saveImage(image);
  };

  const useCamera = async () => {
    const hasPermission = await checkAndRequestPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Escolher imagem de Perfil',
      cropperCircleOverlay: true,
      mediaType: 'photo',
      includeBase64: true,
    });

    await saveImage(image);
  };

  const saveImage = async image => {
    try {
      setOpened(false);
      isLoading(true);
      const storageRef = getStorageRef(`users/${user.id}/imageprofile.png`);
      await storageRef.putString(
        `data:${image.mime};base64,${image.data}`,
        'data_url',
      );
      const imageAddress = await storageRef.getDownloadURL();
      await updateUserService(user.id, {photoURL: imageAddress});
      isLoading(false);
    } catch (e) {
      isLoading(false);

      notifyError({
        title: 'Estamos com problemas para processar a imagem',
        message: 'Tente novamente mais tarde',
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setOpened(true)}>
        <UserPicture editIcon loading={loading} width={width} height={height} />
      </TouchableOpacity>
      <Menu
        opened={opened}
        renderer={SlideInMenu}
        onBackdropPress={() => setOpened(false)}>
        <MenuTrigger />
        <MenuOptions
          customStyles={{optionText: [styles.text, styles.slideInOption]}}>
          <MenuOption onSelect={useCamera} text="Usar Câmera" />
          <MenuOption onSelect={useGallery} text="Usar Galeria" />
        </MenuOptions>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgray',
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop: 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
  slideInOption: {
    padding: 5,
  },
  text: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
});
