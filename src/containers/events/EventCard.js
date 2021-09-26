import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Text from '../../components/Typography/Text';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {Screens} from '../../contants/screens';
import {firestoreTimeToMoment, formattedDate} from '../../helpers/common';
import Chip from '../../components/Chip';

const NewsContentContainer = styled(View)`
  padding: 10px 24px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.card.borderColor};
`;

const EventTitle = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const DateText = styled(Text)`
  font-weight: 200;
  font-size: 14px;
  line-height: 28px;
`;

export default ({event}) => {
  const navigation = useNavigation();
  const date = formattedDate(
    firestoreTimeToMoment(event.dateTime),
    'DD MMM - HH:mm',
  );

  const goToEventDetail = () => {
    navigation.push(Screens.EVENTS.navigator, {
      screen: Screens.EVENTS.EVENT_DETAILS_SCREEN,
      params: {id: event.id},
    });
  };

  return (
    <TouchableOpacity onPress={goToEventDetail}>
      <NewsContentContainer>
        <EventTitle>{event.title}</EventTitle>
        <DateText>{date.toUpperCase()}</DateText>
        {event.happened ? (
          <View style={{marginVertical: 10}}>
            <Chip active={true} text="Evento Realizado" />
          </View>
        ) : null}
      </NewsContentContainer>
    </TouchableOpacity>
  );
};
