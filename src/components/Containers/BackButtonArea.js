import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BackIcon from '../Icons/BackIcon';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';

const BackButtonContainer = styled(View)`
  width: 40px;
`;

export default ({style, onPress, hasPadding}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style} onPress={onPress || navigation.goBack}>
      <BackButtonContainer>
        <BackIcon />
      </BackButtonContainer>
    </TouchableOpacity>
  );
};
