import React, {useEffect, useState} from 'react';
import ViewContainer from '../../components/Containers/ViewContainer';
import {createPostRepliesListenerService} from '../../services/forum/postReplies';
import ForumPostReply from './ForumPostReply';

export default ({postId}) => {
  const [replies, setReplies] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    createPostRepliesListener();
  }, []);

  const createPostRepliesListener = () => {
    isLoading(true);
    createPostRepliesListenerService(postId, replies => {
      isLoading(false);
      setReplies(replies);
    });
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      {replies.map(reply => (
        <ForumPostReply key={reply.id} postId={postId} reply={reply} />
      ))}
    </ViewContainer>
  );
};
