import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text, {HighContrastText} from '../../components/Typography/Text';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import UserPicture from '../../components/UserPicture';
import Header from '../../containers/Header';
import styled from 'styled-components';
import MapsStaticImage from '../../containers/events/MapsStaticImage';
import {Screens} from '../../contants/screens';

const AddressContainer = styled(View)`
  background-color: ${props => props.theme.colors.secondary};
  padding: 12px 24px;
  shadow-color: rgba(0, 0, 0, 0.08);
  margin-top: 10px;
  elevation: 3;
  shadow-opacity: 1;
  shadow-radius: 2;
  z-index: 1;
`;

const PlaceText = styled(HighContrastText)`
  font-weight: 700;
  font-size: 17px;
  line-height: 43px;
`;

const AddressText = styled(Text)`
  font-weight: 300;
  font-size: 15px;
  line-height: 17px;
`;

export default ({navigation, route}) => {
  const {discount} = route.params;

  const goToEventMapDetail = () => {
    navigation.push(Screens.DISCOUNTS_CLUB.navigator, {
      screen: Screens.DISCOUNTS_CLUB.DISCOUNT_MAP_DETAILS_SCREEN,
      params: {discount},
    });
  };

  return (
    <>
      <Header />
      <ScrollContainer
        canGoBackStyle={{paddingLeft: 24}}
        noHeaderPadding
        canGoBack
        noPadding>
        <View style={styles.lockerContainer}>
          <UserPicture photoURL={discount.brand} width={118} height={118} />
        </View>
        <View style={styles.textContainer}>
          <HighContrastText
            style={{textAlign: 'center'}}
            size={22}
            fontStyle="bold">
            {discount.discount}
          </HighContrastText>
          <Text style={{textAlign: 'center'}} fontStyle={300}>
            {discount.discount_description}
          </Text>
        </View>
        <AddressContainer paddingVertical={12}>
          <PlaceText>{discount.company}</PlaceText>
          <AddressText>{discount.address}</AddressText>
        </AddressContainer>
        <View style={{zIndex: 10}}>
          <TouchableOpacity onPress={goToEventMapDetail}>
            <MapsStaticImage
              height={160}
              mapCoordinates={discount.mapCoordinates}
              address={discount.address}
            />
          </TouchableOpacity>
        </View>
      </ScrollContainer>
    </>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    paddingTop: 40,
  },
  formInput: {
    paddingTop: 45,
  },
  socialNetworkLoginContainer: {
    marginTop: 100,
  },
  lockerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 25,
  },
  footerTextContainer: {
    marginVertical: 40,
  },
});
