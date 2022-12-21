import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import UserPicture from '../../components/LoggedUserPicture';
import {useSelector} from 'react-redux';
import Text from '../../components/Typography/Text';
import {useNavigation} from '@react-navigation/native';

export default (props) => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
      <View style={styles.container}>
        <UserPicture />
        <Text fontStyle="600" size={14} style={[styles.name, props.textStyle]}>
          {user.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginVertical: 30,
  },
  name: {
    paddingLeft: 12,
    flexShrink: 1,
    alignSelf: 'center',
  },
});
