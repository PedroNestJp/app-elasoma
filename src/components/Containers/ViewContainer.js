import React from 'react';
import styled from 'styled-components';
import {SafeAreaView} from 'react-native';
import Loading from '../Loading';
import BackButtonArea from './BackButtonArea';

const CustomSafeAreaView = styled(SafeAreaView)`
  background-color: ${props => props.theme.containerBackground};
  flex: 1;
`;

export default ({
  children,
  loading,
  style,
  canGoBack = false,
  noPaddingHorizontal = false,
  paddingVertical = 0,
  canGoBackStyle,
}) => {
  return (
    <CustomSafeAreaView
      style={{
        ...style,
        paddingHorizontal: noPaddingHorizontal ? 0 : 24,
        paddingVertical,
      }}
      forceInset={{bottom: 'never'}}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {canGoBack && <BackButtonArea style={canGoBackStyle} hasPadding />}
          {children}
        </>
      )}
    </CustomSafeAreaView>
  );
};
