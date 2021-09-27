import {
  createDocListener,
  getColData,
  getColRef,
  getDoc,
  getDocRef,
} from '../common/firestore';
import {getUserFromStore} from '../../helpers/store';
import {firestore} from '../../config/firebase';

const FORUM_CATEGORIES_PATH = 'forum_categories';
export const FORUM_PATH = 'forum';

export const INCREASE_OPERATION = 'increase';
export const DECREASE_OPERATION = 'decrease';
export const INCLUDE_OPERATION = 'include';
export const EXCLUDE_OPERATION = 'exclude';

export const getForumCategoriesService = async () => {
  return await getColData(FORUM_CATEGORIES_PATH, {orderBy: 'name'});
};

export const getForumCategoriesByStateService = async selectedState => {
  const data = await firestore
    .collection(FORUM_CATEGORIES_PATH)
    .where(`quantity_per_state.${selectedState}`, '>', 0)
    .orderBy(`quantity_per_state.${selectedState}`, 'asc')
    .get();

  const categories = [];
  data.forEach(item => categories.push({id: item.id, ...item.data()}));
  return categories;
};

export const getSingleForumCategory = async categoryId => {
  return await getDoc(`${FORUM_CATEGORIES_PATH}/${categoryId}`);
};

export const getSingleForumPost = async postId => {
  return await getDoc(`${FORUM_PATH}/${postId}`);
};

export const createForumPostService = async values => {
  const newForumPost = mountForumPostObject(values);

  const forumRef = getColRef(FORUM_PATH, {});
  return await forumRef.add(newForumPost);
};

export const getActiveForumPostsByCategoryService = async (
  categoryId,
  stateId,
) => {
  const data = await firestore
    .collection(FORUM_PATH)
    .where('isActive', '==', true)
    .where('category.id', '==', categoryId)
    .where('state', '==', stateId)
    .orderBy(`createdAt`, 'desc')
    .get();

  const categories = [];
  data.forEach(item => categories.push({id: item.id, ...item.data()}));
  return categories;
};

export const updateForumPostService = async (postId, newPostData) => {
  const postRef = getDocRef(`${FORUM_PATH}/${postId}`);
  return await postRef.update(newPostData);
};

export const updatePostInteractionCounter = async (postId, operation) => {
  const post = await getSingleForumPost(postId);
  let postInteractionCounter = post.interactionCounter || 0;

  if (operation === INCREASE_OPERATION) {
    postInteractionCounter = postInteractionCounter + 1;
  }

  if (operation === DECREASE_OPERATION) {
    postInteractionCounter = postInteractionCounter + 1;
  }

  return await updateForumPostService(postId, {
    interactionCounter: postInteractionCounter,
  });
};

export const updatePostRepliesCounter = async (postId, operation) => {
  const post = await getSingleForumPost(postId);

  let postrepliesCounter = post.repliesCounter || 0;

  if (operation === INCREASE_OPERATION) {
    postrepliesCounter = postrepliesCounter + 1;
  }

  if (operation === DECREASE_OPERATION) {
    postrepliesCounter = postrepliesCounter + 1;
  }

  return await updateForumPostService(postId, {
    repliesCounter: postrepliesCounter,
  });
};

export const updatePostInteractionPeople = async (postId, operation) => {
  const post = await getSingleForumPost(postId);
  const author = mountAuthor();

  let postInteractionPeople = post.interactionPeople || [];

  if (
    operation === 'include' &&
    !postInteractionPeople.some(person => person.id === author.id)
  ) {
    postInteractionPeople.push(author);
    await updatePostInteractionCounter(postId, INCREASE_OPERATION);
  }

  if (
    operation === 'exclude' &&
    postInteractionPeople.some(person => person.id === author.id)
  ) {
    postInteractionPeople = postInteractionPeople.filter(
      person => person.id !== author.id,
    );

    await updatePostInteractionCounter(postId, DECREASE_OPERATION);
  }

  return await updateForumPostService(postId, {
    interactionPeople: postInteractionPeople,
  });
};

const mountForumPostObject = post => {
  const author = mountAuthor();
  const user = getUserFromStore();

  return {
    ...post,
    author,
    state: user.state,
    stateDetails: user.stateData,
    isActive: false,
    createdAt: new Date(),
  };
};

export const mountAuthor = () => {
  const user = getUserFromStore();

  return {
    id: user.id,
    name: user.name,
    state: user.state,
    stateDetails: user.stateData,
    photoURL: user.photoURL,
    business: user.business,
  };
};

export const createForumPostListenerService = (postId, callback) => {
  createDocListener(`${FORUM_PATH}/${postId}`, callback);
};

export const updateForumPostLikesService = async (forumPostId, likes) => {
  const newsRef = getDocRef(`${FORUM_PATH}/${forumPostId}`);
  return await newsRef.update({likes, likesQuantity: likes.length || 0});
};
