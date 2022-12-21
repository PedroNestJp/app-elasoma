import {firestore} from '../config/firebase';
import {
  createDocListener,
  getColData,
  getDoc,
  getDocRef,
} from './common/firestore';
import {getUserFromStore} from '../helpers/store';

export const FILTERS_OPTIONS_ENUM = {
  all: 'all',
  happened: 'happened',
  to_happen: 'to_happen',
  attended: 'attended',
};

const FilterStrategies = {
  [FILTERS_OPTIONS_ENUM.all]: {
    set: (ref, stateId) => ref.where('state', '==', stateId),
  },
  [FILTERS_OPTIONS_ENUM.happened]: {
    set: (ref, stateId) => {
      let filterRef = ref;
      filterRef = filterRef.where('dateTime', '<', new Date());
      return filterRef.where('state', '==', stateId);
    },
  },
  [FILTERS_OPTIONS_ENUM.to_happen]: {
    set: (ref, stateId) => {
      let filterRef = ref;
      filterRef = filterRef.where('dateTime', '>', new Date());
      return filterRef.where('state', '==', stateId);
    },
  },
  [FILTERS_OPTIONS_ENUM.attended]: {
    set: (ref, stateId) => {
      const user = getUserFromStore();
      let filterRef = ref;
      filterRef = filterRef.where('dateTime', '<', new Date());
      filterRef = filterRef.where('state', '==', stateId);
      return filterRef.where('confirmedIds', 'array-contains', user.id);
    },
  },
};

export const getEventsByStateService = async (stateId, filter) => {
  let eventsRef = firestore
    .collection('events')
    .where('state', '==', stateId)
    .orderBy('dateTime', 'desc');

  if (filter) {
    eventsRef = FilterStrategies[filter].set(eventsRef, stateId);
  }
  const news = await eventsRef.get();

  return news.docs.map(n => ({...n.data(), id: n.id}));
};

export const getEventService = async eventId => {
  return await getDoc(`events/${eventId}`);
};

export const createEventListenerService = (eventId, callback) => {
  return createDocListener(`events/${eventId}`, callback);
};

export const updateEventService = async (eventId, data) => {
  const eventRef = getDocRef(`events/${eventId}`);
  return await eventRef.update(data);
};

export const getSpotlightsEventsByStateService = async stateId => {
  const newsRef = firestore
    .collection('events')
    .where('state', '==', stateId)
    .where('spotlight', '==', true)
    .orderBy('dateTime');
  const news = await newsRef.get();

  return news.docs.map(n => ({...n.data(), id: n.id}));
};

export const getEventGalleryService = async eventId => {
  return await getColData(`events/${eventId}/gallery`, {});
};
