import {firestore} from '../../config/firebase';

export const getDocRef = path => firestore.doc(path);

export const getDoc = async path => {
  const data = await getDocRef(path).get();
  return {...data.data(), id: data.id};
};

export const getColRef = (path, {orderBy, orderDirection = 'asc'}) => {
  if (orderBy) {
    return firestore.collection(path).orderBy(orderBy, orderDirection);
  }
  return firestore.collection(path);
};

export const setDoc = async (path, data) => {
  const ref = getDocRef(path);
  return await ref.set(data);
};

export const addDoc = async (collectionPath, data) => {
  const ref = getColRef(collectionPath, {});
  return await ref.add(data);
};

export const updateDoc = async (path, data) => {
  const doc = getDocRef(path);
  return await doc.update(data);
};

export const deleteDoc = async path => {
  const doc = getDocRef(path);
  return await doc.delete();
};

export const createDocListener = (path, callback) => {
  const docRef = getDocRef(path);
  docRef.onSnapshot(doc => {
    if (doc) {
      callback({...doc.data(), id: doc.id});
    }
  });
};

export const createColListener = (
  path,
  callback,
  {orderBy, orderDirection},
) => {
  const colRef = getColRef(path, {orderBy, orderDirection});
  colRef.onSnapshot(snapshot => {
    const data = [];
    snapshot.docs.forEach(item => data.push({id: item.id, ...item.data()}));

    callback(data);
  });
};

export const getColData = async (path, {orderBy}) => {
  const col = await getCol(path, {orderBy});
  const data = [];
  col.forEach(item => data.push({id: item.id, ...item.data()}));

  return data;
};

export const getCol = async (path, {orderBy}) => {
  const col = getColRef(path, {orderBy});
  return await col.get();
};
