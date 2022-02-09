import {firestore} from '../config/firebase';

export const getAffiliatedsService = async ({state, limit, startAfter}) => {
  let affiliatedRef = firestore
    .collection('users')
    .where('state', '==', state)
    .orderBy('name', 'asc');

  if (startAfter)
    affiliatedRef = affiliatedRef.startAfter(startAfter).limit(limit);
  else affiliatedRef = affiliatedRef.limit(limit);

  const affiliated = await affiliatedRef.get();

  return {
    affiliateds: affiliated.docs.map(n => ({...n.data(), id: n.id})),
    lastOne: affiliated.docs[affiliated.docs.length - 1],
  };
};

export const getAffiliatedsPerCityService = async ({city, limit, startAfter}) => {
  let affiliatedRef = firestore
    .collection('users')
    .where('city', '==', city)
    .orderBy('name', 'asc');

  if (startAfter)
    affiliatedRef = affiliatedRef.startAfter(startAfter).limit(limit);
  else affiliatedRef = affiliatedRef.limit(limit);

  const affiliated = await affiliatedRef.get();

  return {
    affiliateds: affiliated.docs.map(n => ({...n.data(), id: n.id})),
    lastOne: affiliated.docs[affiliated.docs.length - 1],
  };
};
