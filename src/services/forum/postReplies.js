import {
  FORUM_PATH,
  INCLUDE_OPERATION,
  INCREASE_OPERATION,
  mountAuthor,
  updatePostInteractionPeople,
  updatePostRepliesCounter,
} from './forum';
import {addDoc, createColListener} from '../common/firestore';

const POST_REPLIES_PATH = postId => `${FORUM_PATH}/${postId}/replies`;

export const replyMainPostService = async (postId, response) => {
  response.author = mountAuthor();
  response.createdAt = new Date();

  await updatePostRepliesCounter(postId, INCREASE_OPERATION);
  await updatePostInteractionPeople(postId, INCLUDE_OPERATION);

  return addDoc(POST_REPLIES_PATH(postId), response);
};

export const createPostRepliesListenerService = (postId, callback) => {
  createColListener(POST_REPLIES_PATH(postId), callback, {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  });
};
