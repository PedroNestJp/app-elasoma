import React from 'react';
import {View, StyleSheet} from 'react-native';
import BackButtonArea from './BackButtonArea';
import Text from '../Typography/Text';
import {useSafeArea} from 'react-native-safe-area-context';

export default ({
  canGoBack,
  RightOptionsComp,
  noHeaderPadding,
  backButtonStyle,
}) => {
  const insets = useSafeArea();
  return (
    <View
      style={[
        styles.container,
        {paddingTop: noHeaderPadding ? 24 : insets.top + 24},
      ]}>
      {canGoBack && <BackButtonArea hasPadding style={backButtonStyle} />}
      {RightOptionsComp && <RightOptionsComp />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
