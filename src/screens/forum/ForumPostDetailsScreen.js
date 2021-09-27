import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import PersonalInfo from '../../containers/user/PersonalInfo';
import ScrollContainer from '../../components/Containers/ScrollContainer';
import styled from 'styled-components';
import LikeArea from '../../containers/LikeArea';
import ReplyArea from '../../containers/ReplyArea';
import DateText from '../../components/DateText';
import {firestoreTimeToMoment, formattedDate} from '../../helpers/common';
import ForumPostInteractionPeople from '../../containers/forum/ForumPostInteractionPeople';
import Line from '../../components/Line';
import ReplyPostArea from '../../containers/forum/ReplyPostArea';
import {replyMainPostService} from '../../services/forum/postReplies';
import {
  createForumPostListenerService,
  updateForumPostLikesService,
} from '../../services/forum/forum';
import ForumPostReplies from '../../containers/forum/ForumPostReplies';
import {showToastSuccess} from '../../helpers/notifications';
import {getUserFromStore} from '../../helpers/store';
import EnableDisableForumPostNotifications from '../../containers/forum/EnableDisableForumPostNotifications';

const Divider = styled(View)`
  margin: 5px;
`;

export default ({navigation, route}) => {
  const [isShownReplyPostArea, showReplyPostArea] = useState(false);
  const [isDoingReply, setDoingReply] = useState(false);
  const [loadingPost, isLoadingPost] = useState(true);
  const [post, setPost] = useState({});
  const user = getUserFromStore();

  useEffect(() => {
    createPostListener();
  }, []);

  const createPostListener = () => {
    const {post} = route.params;
    isLoadingPost(true);
    createForumPostListenerService(post.id, post => {
      setPost(post);
      isLoadingPost(false);
    });
  };

  const replyPost = async response => {
    try {
      setDoingReply(true);
      await replyMainPostService(post.id, response);
      showToastSuccess('Sua resposta foi registrada');
      showReplyPostArea(false);
      setDoingReply(false);
    } catch (e) {
      setDoingReply(false);
    }
  };

  const memoizedForumPostInteractionPeople = useMemo(
    () => <ForumPostInteractionPeople people={post.interactionPeople} />,
    [post.interactionPeople],
  );

  const likePost = async () => {
    const likes = post.likes && post.likes.length ? post.likes : [];

    const newLikes = likes.includes(user.id)
      ? likes.filter(like => like !== user.id)
      : likes.concat([user.id]);

    await updateForumPostLikesService(post.id, newLikes);
  };

  const PostDetailHeader = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <PersonalInfo user={post.author} />
        <EnableDisableForumPostNotifications post={post} />
      </View>
      <View style={{marginBottom: 12}}>
        <Divider />
        <Text fontStyle="bold" size={16}>
          {post.title}
        </Text>
        <Divider />
        <Text>{post.text}</Text>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <LikeArea
              onPress={likePost}
              likes={post.likes ? post.likes.length : 0}
            />
            <View style={{marginHorizontal: 10}}>
              <ReplyArea
                onPress={() => showReplyPostArea(!isShownReplyPostArea)}
                replies={post.repliesCounter || 0}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {memoizedForumPostInteractionPeople}
            <DateText
              date={formattedDate(
                firestoreTimeToMoment(post.createdAt),
                'DD MMM YYYY - hh:mm A',
              )}
            />
          </View>
        </View>
      </View>
      <Line />
    </>
  );

  return (
    <>
      <Header />
      <ScrollContainer loading={loadingPost} canGoBack noHeaderPadding>
        <PostDetailHeader />
        {isShownReplyPostArea && (
          <ReplyPostArea
            placeholder="Responder tópico"
            onReply={replyPost}
            loading={isDoingReply}
          />
        )}
        <ForumPostReplies postId={post.id} />
      </ScrollContainer>
    </>
  );
};
