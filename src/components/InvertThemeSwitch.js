import React, {useContext} from 'react';
import {Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppConfigActions} from '../redux/actions';
import {ThemeContext} from 'styled-components';

export default () => {
  const {theme} = useSelector(state => state.appConfig);
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <Switch
      trackColor={{
        false: themeContext.input.switch.darkMode,
        true: themeContext.input.switch.lightMode,
      }}
      ios_backgroundColor={themeContext.input.switch.backgroundColor}
      thumbColor={themeContext.input.switch.thumbColor}
      onChange={() => dispatch(AppConfigActions.invertTheme())}
      value={theme === 'light'}
    />
  );
};
