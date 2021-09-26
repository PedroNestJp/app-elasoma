import React from 'react';
import styled from 'styled-components';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import BackButtonArea from './BackButtonArea';

const CustomKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  background-color: ${props => props.theme.containerBackground};
  flex: 1;
  justify-content: center;
`;

const BackButtonAreaView = styled(View)`
  margin-top: 32px;
`;

export default ({children, loading, canGoBack = false, navigation, style}) => (
  <CustomKeyboardAvoidingView
    contentContainerStyle={{backgroundColor: 'transparent'}}
    behavior="padding"
    enabled={Platform.OS === 'ios'}>
    {canGoBack && <BackButtonArea hasPadding />}
    {children}
  </CustomKeyboardAvoidingView>
);
