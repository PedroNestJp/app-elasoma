import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {HighContrastText} from '../../components/Typography/Text';

const SectionContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  align-items: center;
  background-color: ${({theme}) => theme.sectionTitle.backgroundColor};
`;

const Title = styled(HighContrastText)`
  font-weight: bold;
  flex-wrap: wrap;
  flex-shrink: 1;
  font-size: 22px;
  margin-left: 10px;
  color: ${({theme}) => theme.sectionTitle.color};
`;

const SectionTitle = ({title, Icon}) => {
  return (
    <SectionContainer>
      <Icon />
      <Title>{title}</Title>
    </SectionContainer>
  );
};

export default SectionTitle;
