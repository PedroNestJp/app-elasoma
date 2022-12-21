import React from 'react';
import styled from 'styled-components';
import {Text} from 'react-native';

const CustomText = styled(Text)`
  color: ${({theme, hasError}) => (hasError ? 'red' : theme.textColor)};
  font-size: ${({size}) => (size ? `${size}px` : '14px')};
  font-weight: ${({fontStyle}) => (fontStyle ? fontStyle : 'normal')};
  font-family: Poppins-Regular;
`;

export default ({style, children, hasError, size, fontStyle, ...props}) => (
  <CustomText
    fontStyle={fontStyle}
    hasError={hasError}
    size={size}
    style={style}
    {...props}>
    {children}
  </CustomText>
);

const CustomHighContrastText = styled(Text)`
  color: ${props => props.theme.textContrastColor};
  font-size: ${({size}) => (size ? `${size}px` : '14px')};
  font-weight: ${({fontStyle}) => (fontStyle ? fontStyle : 'normal')};
  font-family: Poppins-Regular;
`;

export const HighContrastText = ({
  style,
  children,
  size,
  fontStyle,
  ...props
}) => (
  <CustomHighContrastText
    fontStyle={fontStyle}
    size={size}
    style={style}
    {...props}>
    {children}
  </CustomHighContrastText>
);
