import React, {useEffect, useState} from 'react';
import Text from '../../components/Typography/Text';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {
  firestoreTimeToMoment,
  formattedDate,
  lastStringChar,
} from '../../helpers/common';

const IMAGE_DISPLAY_CICLE = 4;
const INITIAL_NUMBER_OF_LINES = 1;

const Container = styled(View)`
  flex-direction: row;
  margin: 1px 16px 0px 0px;
`;

const CardDetail = styled(View)`
  height: 3px;
  background-color: ${({theme}) => theme.sectionTitle.spacingBackgroundColor};
`;

const NewsTag = styled(View)`
  width: 7px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const NewsContentContainer = styled(View)`
  margin: 10px 12px;
`;

const CustomImage = styled(Image)`
  margin: 10px 12px;
  width: 150px;
  border-radius: 5px;
`;

const NewsTitle = styled(Text)`
  font-weight: 600;
  flex-wrap: wrap;
  flex-shrink: 1;
  line-height: 24px;
  font-size: 22px;
`;

const DateText = styled(Text)`
  font-weight: 200;
  font-size: 10px;
  line-height: 19px;
`;

const SpotlightText = styled(Text)`
  flex: 1;
  flex-wrap: wrap;
  line-height: 15px;
  font-size: 14px;
`;

export default ({news, onSelectCard, order}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [numberOfLines, setNumberOfLines] = useState(INITIAL_NUMBER_OF_LINES);
  const date = formattedDate(
    firestoreTimeToMoment(news.createdAt),
    'DD MMM YYYY - hh:mm A',
  );
  const canShowImage =
    news.image && news.image !== '' && order % IMAGE_DISPLAY_CICLE === 0;

  const canShowSpotlight =
    lastStringChar(order.toString()) === '1' ||
    lastStringChar(order.toString()) === '6';

  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) => setWidth(window.width));
    return () => {
      Dimensions.removeEventListener('change');
    };
  });

  return (
    <TouchableOpacity
      onLongPress={() =>
        setNumberOfLines(numberOfLines ? null : INITIAL_NUMBER_OF_LINES)
      }
      onPress={() => onSelectCard(news.id)}>
      <Container>
        <NewsTag style={{backgroundColor: news.categoryDetails.color}} />
        <NewsContentContainer style={canShowImage && {width: width - 200}}>
          <NewsTitle>{news.title}</NewsTitle>
          {canShowSpotlight ? (
            <SpotlightText numberOfLines={numberOfLines}>
              {news.spotlight}
            </SpotlightText>
          ) : null}
          <DateText>{date}</DateText>
        </NewsContentContainer>
        {canShowImage ? (
          <CustomImage
            progressiveRenderingEnabled
            source={{uri: news.image, cache: 'force-cache'}}
          />
        ) : null}
      </Container>
      <CardDetail />
    </TouchableOpacity>
  );
};
