import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ThemeContext} from 'styled-components';
import {AppConfigActions} from '../redux/actions';
import {signOut} from '../services/auth/auth';
import DrawerItem from '../components/Drawer/DrawerItem';
import UserProfile from '../containers/Drawer/UserProfile';
import BackButtonArea from '../components/Containers/BackButtonArea';
import AboutScreen from '../screens/app/AboutScreen';
import InvertThemeSwitch from '../components/InvertThemeSwitch';
import TextButton from '../components/Buttons/TextButton';
import App from './App';
import {Screens} from '../contants/screens';
import MainStack from './MainStack';
import {INSERT_DISCOUNT_TOGGLE} from '@env';

const Drawer = createDrawerNavigator();

export default () => {
  const themeContext = useContext(ThemeContext);
  const drawerStyle = {
    backgroundColor: themeContext.drawer.backgroundColor,
  };

  return (
    <Drawer.Navigator
      drawerStyle={drawerStyle}
      drawerContent={props => <CustomDrawerComp {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="MainStack"
        component={MainStack}
      />
    </Drawer.Navigator>
  );
};

export const CustomDrawerComp = props => {
  const themeContext = useContext(ThemeContext);
  const {
    navigation: {jumpTo, navigate},
  } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={{flexGrow: 2}}>
        <CloseDrawer navigate={jumpTo} />
        <UserProfile/>
        <DrawerItem
          label="Início"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.APP.navigator, {screen: Screens.APP.HOME_SCREEN})
          }
        />
        <DrawerItem
          label="Editar Perfil"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.APP.navigator, {
              screen: Screens.APP.EDIT_PROFILE_SCREEN,
            })
          }
        />
        <DrawerItem
          label="Inserir Desconto"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.DISCOUNTS_CLUB.navigator, {
              screen: Screens.DISCOUNTS_CLUB.DISCOUNT_CREATE_DISCOUNT_SCREEN,
            })
          }
        />
        <DrawerItem
          label="Notificações"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.NOTIFICATIONS.navigator, {
              screen: Screens.NOTIFICATIONS.NOTIFICATIONS_SCREEN,
            })
          }
        />
        <DrawerItem
          label="Áreas de Interesse"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.NEWS.navigator, {
              screen: Screens.NEWS.INTERESTS_SCREEN,
            })
          }
        />
        <DrawerItem
          label="Sobre"
          onPress={() => navigate('App', {screen: 'AboutScreen'})}
        />
      </View>
      <View>
        <InvertThemeOption />
        <DrawerItem hasTopDivider exitColor onPress={signOut} label="Sair" />
      </View>
    </DrawerContentScrollView>
  );
};

const CloseDrawer = ({navigate}) => (
  <View style={styles.closeDrawerContainer}>
    <BackButtonArea onPress={navigate.closeDrawer} />
  </View>
);

const InvertThemeOption = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.appConfig);

  const label = theme === 'light' ? 'Modo Escuro' : 'Modo Claro';
  return (
    <View style={styles.invertThemeContainer}>
      <TextButton
        icon={theme === 'light' ? 'moon' : 'sun'}
        text={label}
        textStyle={{color: themeContext.drawer.textColor}}
        onPress={() => dispatch(AppConfigActions.invertTheme())}
      />
      <InvertThemeSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 24,
  },
  listItemContainer: {},
  listItemText: {
    color: '#000',
  },
  closeDrawerContainer: {
    paddingTop: 10,
    paddingRight: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invertThemeContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 18,
  },
});
