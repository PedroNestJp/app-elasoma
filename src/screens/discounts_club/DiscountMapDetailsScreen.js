import React from 'react';
import ViewContainer from '../../components/Containers/ViewContainer';
import {Dimensions, View, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Text from '../../components/Typography/Text';
import Button from '../../components/Buttons/Button';
import MapsStaticImage from '../../containers/events/MapsStaticImage';
import openMap from 'react-native-open-maps';
import BackButtonArea from '../../components/Containers/BackButtonArea';

const BackButtonContainer = styled(View)`
  position: absolute;
  z-index: 20;
  margin: 48px 24px;
`;

const EventPlace = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const style = StyleSheet.create({
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    flexGrow: 1,
    position: 'absolute',
    zIndex: 20,
    bottom: 0,
  },
});

export default ({route}) => {
  const {discount} = route.params;

  const goToRoute = () => {
    openMap({
      navigate_mode: 'preview',
      query: `${discount.address} - ${discount.mapCoordinates.lat},${discount.mapCoordinates.lng}`,
    });
  };

  return (
    <>
      <ViewContainer noPaddingHorizontal>
        <BackButtonContainer>
          <BackButtonArea />
        </BackButtonContainer>
        <View style={{flexGrow: 2}}>
          <MapsStaticImage
            height={Dimensions.get('screen').height}
            mapCoordinates={discount.mapCoordinates}
            address={discount.address}
          />
        </View>
        <ViewContainer style={style.routeContainer}>
          <View
            style={{
              paddingVertical: 24,
              width: Dimensions.get('window').width - 200,
            }}>
            <EventPlace>{discount.company}</EventPlace>
            <Text>{discount.address}</Text>
          </View>
          <View>
            <Button
              onPress={goToRoute}
              size="medium"
              text="Ver Rota"
              style={{marginTop: -20, marginHorizontal: 20, width: 150}}
            />
          </View>
        </ViewContainer>
      </ViewContainer>
    </>
  );
};
