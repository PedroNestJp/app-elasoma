import React from 'react';
import styled from 'styled-components';
import {
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Loading from '../Loading';

let Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

Touchable = styled(Touchable)`
  border-radius: 30px;
`;

const CustomButtonView = styled(View)`
  background-color: transparent;
  border-radius: 30px;
  width: auto;
  border-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-color: ${props => props.theme.input.borderColor};
`;

const CustomButtonText = styled(Text)`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  line-height: ${props => (props.size === 'large' ? '32px' : '25px')};
  font-style: normal;
  font-weight: 600;
  padding: ${props => (props.size === 'large' ? '14px' : '0')};
  font-family: Poppins-Regular;
`;

export default ({
  disabled,
  onPress,
  text,
  size,
  loading,
  fullwidth = false,
}) => (
  <Touchable disabled={disabled} onPress={onPress}>
    <CustomButtonView disabled={disabled} fullwidth={fullwidth}>
      <View>{loading && <Loading />}</View>
      <CustomButtonText size={size} disabled={disabled}>
        {text}
      </CustomButtonText>
    </CustomButtonView>
  </Touchable>
);
