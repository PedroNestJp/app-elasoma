import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import Text from './Typography/Text';

const ChipContainer = styled(View)`
  background-color: ${({theme, active}) =>
    active ? theme.chip.activeBackgroundColor : theme.chip.backgroundColor};
  border-radius: 20px;
  border-color: ${({theme, active}) =>
    active ? theme.chip.activeBorderColor : theme.chip.borderColor};
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  width: auto;
  align-self: flex-start;
`;

const CustomText = styled(Text)`
  color: ${({theme, active}) =>
    active ? theme.chip.activeTextColor : theme.chip.textColor};
`;

export default ({text, active, fontSize = 14}) => (
  <ChipContainer active={active}>
    <CustomText style={{fontSize: fontSize}} active={active}>
      {text}
    </CustomText>
  </ChipContainer>
);
