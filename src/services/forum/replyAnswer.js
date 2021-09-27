import {
  FORUM_PATH,
  INCLUDE_OPERATION,
  mountAuthor,
  updatePostInteractionPeople,
} from './forum';
import {addDoc, createColListener} from '../common/firestore';

const POST_REPLY_REPLIES_PATH = (postId, replyId) =>
  `${FORUM_PATH}/${postId}/replies/${replyId}/answers`;

export const answerReplyService = async (postId, replyId, response) => {
  response.author = mountAuthor();
  response.createdAt = new Date();

  await updatePostInteractionPeople(postId, INCLUDE_OPERATION);

  return addDoc(POST_REPLY_REPLIES_PATH(postId, replyId), response);
};

export const createAnswersRepliesListenerService = (
  postId,
  replyId,
  callback,
) => {
  createColListener(POST_REPLY_REPLIES_PATH(postId, replyId), callback, {
    orderBy: 'createdAt',
    orderDirection: 'asc',
  });
};
