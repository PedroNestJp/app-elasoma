import React from 'react';
import styled from 'styled-components';
import {ScrollView} from 'react-native';
import Loading from '../Loading';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderOptions from './HeaderOptions';

const CustomSafeAreaScrollView = styled(ScrollView)`
  background-color: ${props => props.theme.containerBackground};
  flex: 1;
`;

export default ({
  children,
  loading,
  canGoBack = false,
  style,
  RightOptionsComp,
  canGoBackStyle,
  noPadding = false,
  noHeaderPadding = false,
  ...rest
}) => (
  <CustomSafeAreaScrollView
    scrollIndicatorInsets={{right: Number.MIN_VALUE}}
    {...rest}
    style={[
      style,
      {
        paddingHorizontal: loading || noPadding ? 0 : 24,
      },
    ]}>
    {loading ? (
      <Loading />
    ) : (
      <>
        {(canGoBack || RightOptionsComp) && (
          <HeaderOptions
            backButtonStyle={canGoBackStyle}
            noHeaderPadding={noHeaderPadding}
            canGoBack={canGoBack}
            RightOptionsComp={RightOptionsComp}
          />
        )}
        <SafeAreaView forceInset={{bottom: 'never'}}>{children}</SafeAreaView>
      </>
    )}
  </CustomSafeAreaScrollView>
);
