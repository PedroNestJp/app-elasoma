import React from 'react';
import styled from 'styled-components';
import Text from './Typography/Text';

const DateText = styled(Text)`
  font-weight: 200;
  font-size: 12px;
`;

export default ({date}) => <DateText>{date}</DateText>;
