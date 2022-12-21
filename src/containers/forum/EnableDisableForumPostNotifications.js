import React, {useState} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {updateForumPostService} from '../../services/forum/forum';
import {showToastError, showToastSuccess} from '../../helpers/notifications';
import DotsIcon from '../../components/Icons/DotsIcon';
import {getUserFromStore} from '../../helpers/store';

const {SlideInMenu} = renderers;

export default ({post}) => {
  const [dialogOpen, isDialogOpen] = useState(false);
  const user = getUserFromStore();

  const text = post.receiveNotification
    ? 'Desativar Notificações'
    : 'Ativar Notificações';

  const handleNotification = async () => {
    try {
      const receiveNotification = !post.receiveNotification;
      isDialogOpen(false);
      await updateForumPostService(post.id, {receiveNotification});

      const notificationText = receiveNotification
        ? 'Você receberá notificações sobre respostas neste tópico'
        : 'Você não receberá notificações sobre respostas neste tópico';

      showToastSuccess(notificationText);
    } catch (e) {
      showToastError(
        'Houve um erro ao ativar esta notificação. Tente mais tarde.',
      );
    }
  };

  if (user.id !== post.author.id) return null;

  return (
    <View>
      <TouchableOpacity onPress={() => isDialogOpen(true)}>
        <DotsIcon />
      </TouchableOpacity>
      <Menu
        opened={dialogOpen}
        renderer={SlideInMenu}
        onBackdropPress={() => isDialogOpen(false)}>
        <MenuTrigger />
        <MenuOptions
          customStyles={{optionText: [styles.text, styles.slideInOption]}}>
          <MenuOption onSelect={handleNotification} text={text} />
        </MenuOptions>
      </Menu>
    </View>
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
