import React, {createRef, useContext} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {useSelector} from 'react-redux';
import CloseIcon from './Icons/CloseIcon';
import TextInputMask from 'react-native-text-input-mask';

const CustomTextInput = styled(TextInputMask)`
  border-bottom-width: 1px;
  border-color: ${props => props.theme.input.borderColor};
  color: ${props => props.theme.textColor};
  padding-bottom: 8px;
  font-family: Poppins-Regular;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
`;

const InputContainer = styled(View)``;

const IconContainer = styled(TouchableOpacity)`
  position: absolute;
  margin-top: ${Platform.OS === 'ios' ? '8px' : '16px'};
`;

const CloseIconContainer = styled(TouchableOpacity)`
  position: absolute;
  margin-top: 16px;
  align-self: flex-end;
`;

export default ({
  value,
  mask,
  style,
  onChangeText,
  placeholder,
  clearButtonMode,
  IconComponent,
  ...props
}) => {
  const themeContext = useContext(ThemeContext);
  const {theme} = useSelector(state => state.appConfig);
  const inputRef = createRef();

  const clearInput = () => {
    inputRef.current?.clear();
    onChangeText('');
  };

  return (
    <InputContainer>
      <CustomTextInput
        ref={inputRef}
        keyboardAppearance={theme}
        value={value}
        style={[
          style,
          IconComponent && {paddingLeft: 20},
          clearButtonMode && {paddingRight: 20},
        ]}
        mask={mask}
        enablesReturnKeyAutomatically
        placeholderTextColor={themeContext.textColor}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        clearButtonMode={clearButtonMode}
        {...props}
      />
      {IconComponent && (
        <IconContainer>
          <IconComponent />
        </IconContainer>
      )}
      {Platform.OS === 'android' &&
        clearButtonMode === 'always' &&
        value !== '' && (
          <CloseIconContainer onPress={clearInput}>
            <CloseIcon />
          </CloseIconContainer>
        )}
    </InputContainer>
  );
};
