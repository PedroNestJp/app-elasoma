import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styled, {ThemeContext} from 'styled-components';
import CloseIcon from './Icons/CloseIcon';
import ArrowIcon from './Icons/ArrowIcon';

const CloseIconContainer = styled(TouchableOpacity)`
  position: absolute;
  margin-top: 16px;
  align-self: flex-end;
`;

export default ({onValueChange, onClear, items, ...props}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View>
      <RNPickerSelect
        style={{
          iconContainer: {
            top: 20,
            right: 10,
          },
          inputIOS: {
            borderBottomWidth: 1,
            borderColor: themeContext.input.borderColor,
            borderRadius: 4,
            color: themeContext.textColor,
            fontSize: 16,
            marginHorizontal: 0,
            paddingVertical: 12,
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            borderBottomWidth: 1,
            borderColor: themeContext.input.borderColor,
            borderRadius: 8,
            color: themeContext.textColor,
            fontSize: 16,
            marginHorizontal: 0,
            paddingRight: 30, // to ensure the text is never behind the icon
            paddingVertical: 8,
          },
        }}
        onValueChange={onValueChange}
        inputIOSContainer
        {...props}
        items={items}
        Icon={() => <ArrowIcon />}
      />
      {onClear ? (
        <CloseIconContainer onPress={onClear}>
          <CloseIcon />
        </CloseIconContainer>
      ) : null}
    </View>
  );
};
