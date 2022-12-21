import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';

export default styled(View)`
  border-bottom-width: 0.5px;
  border-top-width: 0.5px;
  border-color: ${props => props.theme.card.borderColor};
`;
