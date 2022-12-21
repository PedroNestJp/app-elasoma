import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Brand from '../components/Brand';
import UserPicture from '../components/LoggedUserPicture';
import styled from 'styled-components';
import {useSafeArea} from 'react-native-safe-area-context';
import MenuIcon from '../components/Icons/MenuIcon';
import {Screens} from '../contants/screens';
import {AppConfigActions} from '../redux/actions';

const CustomView = styled(View)`
  background-color: ${props => props.theme.containerBackground};
  padding: 0px 24px 12px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-color: ${props => props.theme.header.borderColor};
`;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeArea();

  return (
    <CustomView
      style={{
        paddingTop: insets.top + 5,
      }}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <UserPicture />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Screens.APP.navigator, {
            screen: Screens.APP.HOME_SCREEN,
          })
        }
        style={styles.brandContainer}>
        <Brand height={34} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(AppConfigActions.toggleRightDrawer())}>
        <MenuIcon />
      </TouchableOpacity>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  brandContainer: {flexGrow: 2, alignSelf: 'center'},
});
