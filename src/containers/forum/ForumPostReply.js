import {View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components';
import UserPicture from '../../components/UserPicture';
import Text from '../../components/Typography/Text';
import {
  firestoreTimeToMoment,
  formattedDate,
  nameAndSurname,
} from '../../helpers/common';
import DateText from '../../components/DateText';
import Title from '../../components/Typography/Title';
import Line from '../../components/Line';
import ReplyArea from '../ReplyArea';
import ReplyPostArea from './ReplyPostArea';
import {showToastError, showToastSuccess} from '../../helpers/notifications';
import {answerReplyService} from '../../services/forum/replyAnswer';
import FormAnswersReply from './FormAnswersReply';

const PersonalInfoContainer = styled(View)`
  flex-direction: row;
`;

export default ({reply, postId, canReply = true}) => {
  const [isShownReplyPostArea, showReplyPostArea] = useState(false);
  const [isDoingReply, setDoingReply] = useState(false);

  const answerReply = async response => {
    if (canReply) {
      try {
        setDoingReply(true);
        await answerReplyService(postId, reply.id, response);
        showToastSuccess('Sua réplica foi adicionada');
        showReplyPostArea(false);
        setDoingReply(false);
      } catch (e) {
        showToastError(
          'Estamos com problema para registrar sua réplica, tente mais tarde.',
        );
        setDoingReply(false);
      }
    }
  };

  return (
    <View style={{marginTop: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <PersonalInfoContainer>
          <UserPicture
            style={{marginRight: 10}}
            photoURL={reply.author.photoURL}
            height={24}
            width={24}
          />
          <View>
            <Title>{nameAndSurname(reply.author.name)}</Title>
            <DateText
              date={formattedDate(
                firestoreTimeToMoment(reply.createdAt),
                'DD MMM YYYY - hh:mm A',
              )}
            />
          </View>
        </PersonalInfoContainer>
        {canReply && (
          <View style={{marginHorizontal: 10}}>
            <ReplyArea
              onPress={() => showReplyPostArea(!isShownReplyPostArea)}
            />
          </View>
        )}
      </View>
      <View>
        <Text>{reply.text}</Text>
      </View>
      {isShownReplyPostArea && canReply && (
        <>
          <View style={{marginVertical: 12}}>
            <Line />
          </View>
          <ReplyPostArea
            placeholder="Replicar"
            onReply={answerReply}
            loading={isDoingReply}
          />
        </>
      )}
      <FormAnswersReply postId={postId} replyId={reply.id} />
      <View style={{marginTop: 12}}>
        <Line />
      </View>
    </View>
  );
};
