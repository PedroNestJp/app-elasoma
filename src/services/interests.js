import {getColData} from './common/firestore';

const URL = 'areas_of_interest';

export const getAreasOfInterestsService = async () => {
  return await getColData('areas_of_interest', {orderBy: 'name'});
};
