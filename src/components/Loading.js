import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ThemeContext} from 'styled-components';

export default ({style, color}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={color || themeContext.activityIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
