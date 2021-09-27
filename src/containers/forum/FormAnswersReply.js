import React, {useEffect, useState} from 'react';
import ForumPostReply from './ForumPostReply';
import {createAnswersRepliesListenerService} from '../../services/forum/replyAnswer';
import {View} from 'react-native';
import Loading from '../../components/Loading';

export default ({postId, replyId}) => {
  const [answers, setAnswers] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    createAnswersRepliesListener();
  }, []);

  const createAnswersRepliesListener = () => {
    isLoading(true);
    createAnswersRepliesListenerService(postId, replyId, answers => {
      isLoading(false);
      setAnswers(answers);
    });
  };

  if (loading) return <Loading />;
  return (
    <View style={{paddingLeft: 24}}>
      {answers.map(reply => (
        <ForumPostReply
          canReply={false}
          key={reply.id}
          postId={postId}
          reply={reply}
        />
      ))}
    </View>
  );
};
