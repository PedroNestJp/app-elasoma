import React, {useState} from 'react';
import Text from '../../components/Typography/Text';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

const INITIAL_NUMBER_OF_LINES = 2;

const NewsContentContainer = styled(View)`
  margin: 10px 0px;
  border-bottom-width: 1px;
  padding: 0px 24px;
  border-color: ${props => props.theme.card.borderColor};
`;

const NewsTitle = styled(Text)`
  color: ${props => props.color};
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
`;

const SpotlightText = styled(Text)`
  flex-wrap: wrap;
  line-height: 15px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export default ({news, onSelectCard}) => {
  const [numberOfLines, setNumberOfLines] = useState(INITIAL_NUMBER_OF_LINES);

  return (
    <TouchableOpacity
      onLongPress={() =>
        setNumberOfLines(numberOfLines ? null : INITIAL_NUMBER_OF_LINES)
      }
      onPress={() => onSelectCard(news.id)}>
      <NewsContentContainer>
        <NewsTitle color={news.categoryDetails.color}>{news.title}</NewsTitle>
        <SpotlightText numberOfLines={numberOfLines}>
          {news.spotlight}
        </SpotlightText>
      </NewsContentContainer>
    </TouchableOpacity>
  );
};
