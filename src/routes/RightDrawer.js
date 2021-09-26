import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {DrawerActions} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ThemeContext} from 'styled-components';
import DrawerItem from '../components/Drawer/DrawerItem';
import {Screens} from '../contants/screens';
import LeftDrawer from './LeftDrawer';
import Input from '../components/Input';
import SearchIcon from '../components/Icons/SearchIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppConfigActions} from '../redux/actions';
import BackButtonArea from '../components/Containers/BackButtonArea';
import bootstrap from '../bootstrap';

const Drawer = createDrawerNavigator();

export default ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  const drawerStyle = {
    backgroundColor: themeContext.drawer.backgroundColor,
  };

  useEffect(() => {
    bootstrap({navigation});
  }, []);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerStyle={drawerStyle}
      drawerContent={props => <CustomDrawerComp {...props} />}>
      <Drawer.Screen name="LeftDrawer" component={LeftDrawer} />
    </Drawer.Navigator>
  );
};

export const CustomDrawerComp = props => {
  const themeContext = useContext(ThemeContext);
  const {rightDrawerAction} = useSelector(state => state.appConfig);
  const {navigation} = props;
  const {navigate} = navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    if (rightDrawerAction === 'toggle') {
      navigation.dispatch(DrawerActions.openDrawer());
      dispatch(AppConfigActions.resetRightDrawer());
    }
  }, [rightDrawerAction === 'toggle']);

  const SearchNewsButton = () => {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() =>
              navigate(Screens.NEWS.navigator, {
                screen: Screens.NEWS.SEARCH_NEWS,
              })
            }>
            <Input
              editable={false}
              IconComponent={SearchIcon}
              placeholder="Pesquisar Notícias"
              placeholderTextColor={themeContext.drawer.textColor}
              style={{textAlign: 'right', borderColor: themeContext.drawer.textColor, color: themeContext.drawer.textColor}}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <DrawerItem
          alignRight
          label="Pesquisar Notícias"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.NEWS.navigator, {
              screen: Screens.NEWS.SEARCH_NEWS,
            })
          }
        />
      );
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={{flexGrow: 2}}>
        <View style={styles.closeDrawerContainer}>
          <BackButtonArea onPress={navigate.closeDrawer} />
        </View>
        <SearchNewsButton />
        <DrawerItem
          alignRight
          label="Notícias"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.APP.navigator, {screen: Screens.APP.HOME_SCREEN})
          }
        />
        <DrawerItem
          alignRight
          label="Eventos"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.EVENTS.navigator, {
              screen: Screens.EVENTS.EVENTS_SCREEN,
            })
          }
        />
        <DrawerItem
          alignRight
          label="Clube de Benefícios"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.DISCOUNTS_CLUB.navigator, {
              screen: Screens.DISCOUNTS_CLUB.DISCOUNTS_CLUB_SCREEN,
            })
          }
        />
        <DrawerItem
          alignRight
          label="Filiados"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.AFFILIATED.navigator, {
              screen: Screens.AFFILIATED.AFFILIATED_SCREEN,
            })
          }
        />
        <DrawerItem
          alignRight
          label="Fórum"
          hasBottomDivider
          onPress={() =>
            navigate(Screens.FORUM.navigator, {
              screen: Screens.FORUM.FORUM_SCREEN,
            })
          }
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 24,
  },
  listItemText: {
    color: '#000',
  },
  closeDrawerContainer: {
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 32,
    flexDirection: 'row',
  },
  invertThemeContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 18,
  },
  searchContainer: {marginHorizontal: 16, marginBottom: 32},
});
