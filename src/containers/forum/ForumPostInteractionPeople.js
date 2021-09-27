import {View} from 'react-native';
import UserPicture from '../../components/UserPicture';
import Text from '../../components/Typography/Text';
import React from 'react';

export default ({people}) => {
  if (people) {
    const shown = people.slice(0, 3);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {shown.map(show => (
          <UserPicture
            key={show.id}
            style={{marginLeft: 4}}
            photoURL={show.photoURL}
            height={24}
            width={24}
          />
        ))}
        {people.length > 3 ? (
          <Text style={{marginLeft: 4}}>
            {people.length > 0 && `+${people.length - 3}`}
          </Text>
        ) : null}
      </View>
    );
  }
  return null;
};
