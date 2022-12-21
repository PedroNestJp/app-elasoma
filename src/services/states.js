import {getColData, getDoc} from './common/firestore';

export const getStatesService = async () => {
  return await getColData('states', {orderBy: 'name'});
};

export const getSegmentsService = async () => {
  return await getColData('segments', {orderBy: 'name'});
};


export const getCitiesService = async stateId => {
  return await getColData(`states/${stateId}/cities`, {orderBy: 'name'});
};

export const getSingleState = async stateId => {
  return await getDoc(`states/${stateId}`);
};
