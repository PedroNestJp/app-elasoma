import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {Screens} from '../../contants/screens';
import Text from '../../components/Typography/Text';
import {firestoreTimeToMoment, formattedDate} from '../../helpers/common';
import Chip from '../../components/Chip';
import {useSelector} from 'react-redux';
import PersonalInfo from '../user/PersonalInfo';

const AffiliatedCardContainer = styled(View)`
  padding: 10px 24px 20px 24px;
  border-bottom-width: 0.5px;
  border-top-width: 0.5px;
  border-color: ${props => props.theme.card.borderColor};
`;

const PostInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const PostExtraDataContainer = styled(View)`
  align-items: flex-end;
`;

const DateText = styled(Text)`
  font-weight: 200;
  font-size: 12px;
  padding-top: 5px;
`;

const PostTitle = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export default ({post}) => {
  const navigation = useNavigation();
  const {theme} = useSelector(state => state.appConfig);

  const goToEventDetail = () => {
    navigation.push(Screens.FORUM.navigator, {
      screen: Screens.FORUM.FORUM_POST_DETAILS_SCREEN,
      params: {post},
    });
  };

  return (
    <TouchableOpacity onPress={goToEventDetail}>
      <AffiliatedCardContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostInfoContainer>
          <PersonalInfo user={post.author} />
          <PostExtraDataContainer>
            <View>
              <Chip
                active={theme === 'light'}
                fontSize={10}
                text={post.category.name}
              />
            </View>
            <DateText>
              {formattedDate(
                firestoreTimeToMoment(post.createdAt),
                'DD MMM YYYY - hh:mm A',
              )}
            </DateText>
          </PostExtraDataContainer>
        </PostInfoContainer>
      </AffiliatedCardContainer>
    </TouchableOpacity>
  );
};
