import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Loading from '../Loading';

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const CustomButtonView = styled(View)`
  background-color: ${props =>
    props.disabled || props.inactiveButton
      ? props.theme.inactiveButton
      : props.theme.primaryButton};
  border-radius: 30px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const IconCompContainer = styled(View)`
  padding-left: 5px;
`;

const CustomButtonText = styled(Text)`
  color: ${props => props.theme.primaryButtonColor};
  font-size: 15px;
  line-height: ${props => (props.size === 'large' ? '32px' : '25px')};
  font-weight: ${props => (props.weight ? props.weight : '900')};
  font-family: Poppins-Regular;
  font-style: normal;
`;

export default ({
  disabled,
  inactiveButton,
  loading,
  onPress,
  textColor,
  size = 'small',
  weight,
  style,
  text,
  IconComp,
}) => {
  const themeContext = useContext(ThemeContext);

  const paddingSize = {large: 14, medium: 8, small: 0};

  return (
    <Touchable style={{borderRadius: 30}} disabled={disabled} onPress={onPress}>
      <CustomButtonView
        style={style}
        inactiveButton={inactiveButton}
        disabled={disabled}>
        <View>
          {loading && (
            <Loading
              color={themeContext.colors.white}
              style={{marginHorizontal: 16}}
            />
          )}
        </View>
        <CustomButtonText
          style={[{padding: paddingSize[size]}, textColor?{color: textColor}:{}]}
          size={size}
          weight={weight}
          disabled={disabled}>
          {text}
        </CustomButtonText>
        {IconComp && (
          <IconCompContainer>
            <IconComp />
          </IconCompContainer>
        )}
      </CustomButtonView>
    </Touchable>
  );
};
