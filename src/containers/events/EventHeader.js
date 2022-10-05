import React from 'react';
import styled from 'styled-components';
import {Dimensions, Image, View} from 'react-native';

import Overlay from '../../assets/imgs/overlay.svg';
import Text from '../../components/Typography/Text';
import {firestoreTimeToMoment, formattedDate} from '../../helpers/common';
import Chip from '../../components/Chip';

const CustomImage = styled(Image)`
  height: 200px;
`;

const TextContainer = styled(View)`
  margin-right: 20px;
  bottom: 20;
  left: 24;
  z-index: 1;
  position: absolute;
`;

const CarouselTitle = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  color: #fff;
  padding-bottom: 8px;
`;

const CarouselDate = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
`;

const ImageOverlay = styled(Overlay)`
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
`;

export default ({event, showDate, textContainerStyle}) => {
  const date = formattedDate(
    firestoreTimeToMoment(event.dateTime),
    'DD MMM - HH:mm',
  );
  return (
    <View style={{maxHeight: 220}}>
      <CustomImage
        style={{
          width: Dimensions.get('window').width,
        }}
        source={{uri: event.image}}
      />

      <TextContainer style={textContainerStyle}>
        {event.happened && (
          <View style={{marginVertical: 10}}>
            <Chip text="EVENTO REALIZADO" />
          </View>
        )}

        <CarouselTitle>{event.title}</CarouselTitle>

        {showDate ? <CarouselDate>{date}</CarouselDate> : null}
      </TextContainer>

      <ImageOverlay
        style={{
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  );
};
