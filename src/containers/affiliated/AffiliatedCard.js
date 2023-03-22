import React from 'react';

import {Linking, View} from 'react-native';
import styled from 'styled-components';
import UserPicture from '../../components/UserPicture';
import Text from '../../components/Typography/Text';
import TextButton from '../../components/Buttons/TextButton';

const AffiliatedCardContainer = styled(View)`
  padding: 10px 24px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.card.borderColor};
  flex-direction: row;
  align-items: center;
`;

const PersonName = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  flex-wrap: wrap;
`;

const PersonBusiness = styled(Text)`
  font-weight: 200;
  font-size: 14px;
  line-height: 28px;
`;
const PersonCounselor = styled(Text)`
  font-weight: 200;
  font-size: 12px;
  line-height: 28px;
`;

export default ({person}) => {
  const openYoutubeVideo = () => {
    Linking.openURL(person.youtube_video);
  };

  return (
    <AffiliatedCardContainer>
      <UserPicture
        style={{marginRight: 20}}
        photoURL={person.photoURL}
        height={40}
        width={40}
      />
      <View style={{flexShrink: 1}}>
        <PersonName>{person.name}</PersonName>
        <PersonBusiness>{person.business}</PersonBusiness>
        <PersonCounselor>{person.counselor}</PersonCounselor>
        {person.youtube_video ? (
          <TextButton
            onPress={openYoutubeVideo}
            text="Assistir Apresentação"
            icon="play"
          />
        ) : null}
      </View>
    </AffiliatedCardContainer>
  );
};
