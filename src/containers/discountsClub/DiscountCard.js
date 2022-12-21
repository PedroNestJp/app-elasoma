import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Text from '../../components/Typography/Text';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {Screens} from '../../contants/screens';
import UserPicture from '../../components/UserPicture';

const NewsContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px 24px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.card.borderColor};
`;

const DiscountPlace = styled(Text)`
  font-weight: 500;
  flex-direction: row;
  font-size: 18px;
  line-height: 22px;
  flex-wrap: wrap;
  flex: 1;
`;

const DateText = styled(Text)`
  font-weight: 200;
  font-size: 14px;
  line-height: 28px;
  margin-right: 20px;
  flex-wrap: wrap;
  flex: 1;
`;

const CustomImageContainer = styled(View)`
  margin-right: 20px;
`;

export default ({discount}) => {
  const navigation = useNavigation();

  const goToEventDetail = () => {
    navigation.push(Screens.DISCOUNTS_CLUB.navigator, {
      screen: Screens.DISCOUNTS_CLUB.DISCOUNT_DETAILS_SCREEN,
      params: {discount},
    });
  };

  return (
    <TouchableOpacity onPress={goToEventDetail}>
      <NewsContentContainer>
        <CustomImageContainer>
          <UserPicture photoURL={discount.brand} />
        </CustomImageContainer>
        <View style={{width: 0, flexGrow: 1}}>
          <DiscountPlace>{discount.company}</DiscountPlace>
          <DateText>{discount.subcategory}</DateText>
        </View>
      </NewsContentContainer>
    </TouchableOpacity>
  );
};
