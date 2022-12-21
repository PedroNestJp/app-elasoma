import React, {useEffect} from 'react';
import Brand from '../../components/Brand';
import {SafeAreaView, StyleSheet} from 'react-native';
import {themes} from '../../contants/themes';
import {getAuthState} from '../../services/auth/auth';

export default () => {
  useEffect(() => {
    getAuthState();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Brand container="dark" style={styles.brand} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themes.light.colors.dark,
  },
  brand: {
    width: 600,
  },
});
