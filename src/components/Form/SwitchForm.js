import React, {useContext} from 'react';
import {Dimensions, View, Switch} from 'react-native';
import Text from '../Typography/Text';
import FormItem from './FormItem';
import {ThemeContext} from 'styled-components';

const SwitchForm = ({onValueChange, value, label, style, labelStyle}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <FormItem
      style={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...style,
      }}>
      <View style={[{width: Dimensions.get('window').width / 1.5}]}>
        <Text style={labelStyle}>{label}</Text>
      </View>
      <Switch
        trackColor={{
          false: themeContext.input.switch.darkMode,
          true: themeContext.input.switch.lightMode,
        }}
        thumbColor={themeContext.input.switch.thumbColor}
        onValueChange={value => onValueChange(value)}
        value={value}
      />
    </FormItem>
  );
};

export default SwitchForm;
