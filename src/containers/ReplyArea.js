import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import Text from '../components/Typography/Text';
import ReplyIcon from '../components/Icons/ReplyIcon';

const LikeAreaContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const LikeText = styled(Text)`
  font-weight: 300;
  font-size: 18px;
  line-height: 35px;
  padding-left: 4px;
`;

export default ({onPress, replies}) => (
  <TouchableOpacity onPress={onPress}>
    <LikeAreaContainer>
      <ReplyIcon />
      <LikeText>{replies}</LikeText>
    </LikeAreaContainer>
  </TouchableOpacity>
);
