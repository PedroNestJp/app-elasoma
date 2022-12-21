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
import {useSelector} from 'react-redux';

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const CustomButtonView = styled(View)`
  background-color: ${({appTheme, color}) =>
    appTheme === 'light' ? color : 'transparent'};
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  border: ${({appTheme, color}) =>
    appTheme === 'light' ? 'none' : `0.803324px solid ${color}`};
  border-radius: 8px;
`;

const CustomButtonText = styled(Text)`
  color: ${props => props.theme.buttons.tag.color};
  font-style: normal;
  padding: 5px 8px;
  font-family: Poppins-Regular;

  font-weight: 500;
  font-size: 15px;
  line-height: 26px;
  display: flex;
  align-items: center;
`;

export default ({disabled, onPress, text, size, style, loading, color}) => {
  const {theme} = useSelector(state => state.appConfig);
  const themeContext = useContext(ThemeContext);

  return (
    <Touchable disabled={disabled} onPress={onPress}>
      <CustomButtonView
        appTheme={theme}
        color={color}
        style={style}
        disabled={disabled}>
        <View>
          {loading && (
            <Loading
              color={themeContext.colors.white}
              style={{marginHorizontal: 16}}
            />
          )}
        </View>
        <CustomButtonText size={size} disabled={disabled}>
          {text}
        </CustomButtonText>
      </CustomButtonView>
    </Touchable>
  );
};
