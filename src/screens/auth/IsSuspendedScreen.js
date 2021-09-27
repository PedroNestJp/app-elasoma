import React from 'react';
import Text from '../../components/Typography/Text';
import {StyleSheet, View} from 'react-native';
import Brand from '../../components/Brand';
import ViewContainer from '../../components/Containers/ViewContainer';
import TextButton from '../../components/Buttons/TextButton';
import {signOut} from '../../services/auth/auth';
import {getAccountSuspendedMessage} from '../../services/users';

export default () => {
  const {title, description} = getAccountSuspendedMessage();

  return (
    <ViewContainer style={styles.containerStyle}>
      <View style={styles.brandContainer}>
        <Brand height={50} />
      </View>
      <Text style={styles.separator}>{title}</Text>
      <Text style={styles.separator}>{description}</Text>
      <Text style={{...styles.separator, fontWeight: 'bold'}}>Obrigado!</Text>
      <View style={{marginTop: 100}}>
        <TextButton size={18} onPress={signOut} underline text="Sair" />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  brandContainer: {width: 200, height: 50, marginBottom: 50},
  separator: {
    marginTop: 10,
    textAlign: 'center',
  },
  containerStyle: {justifyContent: 'center', alignItems: 'center'},
});
