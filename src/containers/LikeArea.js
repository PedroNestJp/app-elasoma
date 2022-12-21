import React from 'react';
import ThumbUpIcon from '../components/Icons/ThumbUpIcon';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import Text from '../components/Typography/Text';

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

export default ({onPress, likes}) => (
  <TouchableOpacity onPress={onPress}>
    <LikeAreaContainer>
      <ThumbUpIcon />
      <LikeText>{likes}</LikeText>
    </LikeAreaContainer>
  </TouchableOpacity>
);
