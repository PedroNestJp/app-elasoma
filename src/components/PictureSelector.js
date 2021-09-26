import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {getStorageRef} from '../services/storage';
import UserPicture from './UserPicture';
import {notifyError} from '../helpers/notifications';
import Text from './Typography/Text';
import {catchError} from '../helpers/errors';

const {SlideInMenu} = renderers;

export default ({width, height, savePath, onSave, label}) => {
  const [photoURL, setPhotoURL] = useState('');
  const [opened, setOpened] = useState(false);
  const [loading, isLoading] = useState(false);

  const useGallery = async () => {
    const image = await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Escolher imagem',
      cropperCircleOverlay: true,
      mediaType: 'photo',
      includeBase64: true,
    });

    await saveImage(image);
  };

  const useCamera = async () => {
    const image = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Escolher imagem',
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
      const storageRef = getStorageRef(savePath);
      await storageRef.putString(
        `data:${image.mime};base64,${image.data}`,
        'data_url',
      );
      const imageAddress = await storageRef.getDownloadURL();
      onSave(imageAddress);
      setPhotoURL(imageAddress);
      isLoading(false);
    } catch (e) {
      catchError(e);
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
        <View style={{alignItems: 'center'}}>
          {label && <Text>{label}</Text>}
          <View style={styles.lockerContainer}>
            <UserPicture
              photoURL={photoURL}
              editIcon
              loading={loading}
              width={width}
              height={height}
            />
          </View>
        </View>
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
  lockerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
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
