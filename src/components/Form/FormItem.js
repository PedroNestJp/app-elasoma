import React from 'react';
import {StyleSheet, View} from 'react-native';

export default ({style, children}) => (
  <View style={{...styles.formInput, ...style}}>{children}</View>
);

const styles = StyleSheet.create({
  formInput: {
    paddingTop: 45,
  },
});
