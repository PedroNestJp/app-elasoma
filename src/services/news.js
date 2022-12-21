import {firestore} from '../config/firebase';
import {getUserFromStore} from '../helpers/store';
import {getDoc, getDocRef} from './common/firestore';

export const getUserNewsService = async ({
  limit,
  startAfter,
  filters: {highlight},
}) => {
  const user = getUserFromStore();

  if (user.interests) {
    const interests = user.interests.map(interest => interest.id);

    let newsRef = firestore
      .collection('news')
      .where('category', 'array-contains-any', interests)
      .where('state', '==', user.state)
      .where('highlight', '==', highlight || false)
      .orderBy('createdAt', 'desc');

    if (startAfter) {
      newsRef = newsRef.startAfter(startAfter).limit(limit);
    } else if (limit) {
      newsRef = newsRef.limit(limit);
    }

    const news = await newsRef.get();

    return {
      news: news.docs.map(n => ({...n.data(), id: n.id})),
      lastOne: news.docs[news.docs.length - 1],
    };
  }
  return null;
};

export const getNewsByCategoryAndState = async (
  interest,
  {orderBy = 'createdAt', orderDirection = 'desc', limit, startAfter},
) => {
  const user = getUserFromStore();

  let newsRef = firestore
    .collection('news')
    .where('category', 'array-contains-any', [interest.id])
    .where('state', '==', user.state)
    .orderBy(orderBy, orderDirection);

  if (startAfter) {
    newsRef = newsRef.startAfter(startAfter).limit(limit);
  } else {
    newsRef = newsRef.limit(limit);
  }

  const news = await newsRef.get();

  return {
    news: news.docs.map(n => ({...n.data(), id: n.id})),
    lastOne: news.docs[news.docs.length - 1],
  };
};

export const getSingleNewsService = async newsId => {
  return await getDoc(`news/${newsId}`);
};

export const getNewsByCategoryService = async categoryId => {
  const newsRef = firestore
    .collection('news')
    .where('category', '==', categoryId)
    .orderBy('createdAt');
  const news = await newsRef.get();

  return news.docs.map(n => ({...n.data(), id: n.id}));
};

export const updateLikesService = async (newsId, likes) => {
  const newsRef = getDocRef(`news/${newsId}`);
  return await newsRef.update({likes, likesQuantity: likes.length || 0});
};

export const increaseViewsService = async (newsId, actualViews) => {
  const newsRef = getDocRef(`news/${newsId}`);
  return await newsRef.update({views: actualViews + 1});
};
