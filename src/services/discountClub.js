import {getColData, getColRef, getDoc} from './common/firestore';
import {firebaseConfig, firestore} from '../config/firebase';
import {getUserFromStore} from '../helpers/store';
import {getSingleState} from './states';

const DISCOUNTS_CLUB_CATEGORY_URL = 'discounts_club_categories';
const DISCOUNTS_CLUB_URL = 'discounts_club';

export const getDiscountClubCategoriesService = async () => {
  return await getColData(DISCOUNTS_CLUB_CATEGORY_URL, {orderBy: 'name'});
};

export const getSingleCategory = async categoryId => {
  return await getDoc(`${DISCOUNTS_CLUB_CATEGORY_URL}/${categoryId}`);
};

export const getDiscountClubCategoriesByStateService = async selectedState => {
  const data = await firestore
    .collection(DISCOUNTS_CLUB_CATEGORY_URL)
    .where(`quantity_per_state.${selectedState}`, '>', 0)
    .orderBy(`quantity_per_state.${selectedState}`, 'asc')
    .get();

  const categories = [];
  data.forEach(item => categories.push({id: item.id, ...item.data()}));
  return categories;
};

export const getDiscountsByStateAndCategory = async (stateId, categoryId) => {
  try {
    const data = await firestore
      .collection(DISCOUNTS_CLUB_URL)
      .where('categoryId', '==', categoryId)
      .where('state', '==', stateId)
      .where('disabled', '==', false)
      .orderBy('createdAt', 'desc')
      .get();
    const discounts = [];
    data.forEach(item => discounts.push({id: item.id, ...item.data()}));
    return discounts;
  } catch (e) {
    console.log(
      'Houve um erro ao coletar descontos por estado e categoria. getDiscountsByStateAndCategory ',
    );
    throw e;
  }
};

export const createDiscountService = async values => {
  const newDiscount = await mountDiscountObject(values);

  const newsRef = getColRef(DISCOUNTS_CLUB_URL, {});
  return await newsRef.add(newDiscount);
};

const mountDiscountObject = async values => {
  const user = getUserFromStore();
  const categoryDetails = await getSingleCategory(values.category.id);
  const stateDetails = await getSingleState(values.state);
  const address = getAddressByObject({
    ...values.address,
    number: values.number,
  });

  const coordinates = await getCoordinatesService(address);

  return {
    disabled: true,
    discount: values.discount,
    discount_description: values.discount_description,
    company: values.company,
    brand: values.brand,
    categoryId: values.category.id,
    categoryDetails: categoryDetails,
    subcategory: values.subcategory,
    state: values.state,
    stateDetails: stateDetails,
    address,
    mapCoordinates: coordinates.geometry.location,
    author: {
      stateUf: user.state,
      photoURL: user.photoURL,
      cityName: user.cityName,
      name: user.name,
      id: user.id,
    },
    authorUid: user.id,
    createdAt: new Date(),
  };
};

export const getCoordinatesService = async query => {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${firebaseConfig.apiKey}&address=${query}`,
  );
  const {results} = await request.json();

  return results[0];
};

export const getAddressByCepService = async cep => {
  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const {erro, logradouro, bairro, localidade, uf} = await request.json();

  if (!erro) {
    return {logradouro, bairro, localidade, uf};
  }
};

export const getAddressByObject = address => {
  if (address) {
    const {logradouro, bairro, localidade, uf, number} = address;
    return `${logradouro || ''}, ${number || ''} ${bairro ||
      ''}, ${localidade || ''} - ${uf || ''}`;
  }
  return null;
};
