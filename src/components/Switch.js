import React, {useContext} from 'react';
import {Switch} from 'react-native';
import {ThemeContext} from 'styled-components';

export default ({value, onChange}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Switch
      trackColor={{
        false: themeContext.input.switch.darkMode,
        true: themeContext.input.switch.lightMode,
      }}
      thumbColor={themeContext.input.switch.thumbColor}
      onValueChange={onChange}
      value={value}
    />
  );
};
