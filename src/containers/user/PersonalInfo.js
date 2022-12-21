import React from 'react';
import UserPicture from '../../components/UserPicture';
import {View} from 'react-native';
import {nameAndSurname} from '../../helpers/common';
import styled from 'styled-components';
import Text from '../../components/Typography/Text';

const PersonalInfoContainer = styled(View)`
  flex-direction: row;
`;

const PersonName = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`;

const PersonBusiness = styled(Text)`
  font-weight: 200;
  font-size: 12px;
`;

export default ({user}) => (
  <PersonalInfoContainer>
    <UserPicture
      style={{marginRight: 10}}
      photoURL={user.photoURL}
      height={40}
      width={40}
    />
    <View>
      <PersonName>{nameAndSurname(user.name)}</PersonName>
      <PersonBusiness>{user.business}</PersonBusiness>
    </View>
  </PersonalInfoContainer>
);
