import { getColData, getColRef, getDoc } from './common/firestore';
import { firebaseConfig, firestore } from '../config/firebase';
import { getUserFromStore } from '../helpers/store';
import { getSingleState } from './states';

const DISCOUNTS_CLUB_CATEGORY_URL = 'discounts_club_categories';
const DISCOUNTS_CLUB_URL = 'discounts_club';

// Service to get discount club categories
export const getDiscountClubCategoriesService = () =>
  getColData(DISCOUNTS_CLUB_CATEGORY_URL, { orderBy: 'name' });

// Service to get a single category by ID
export const getSingleCategory = categoryId =>
  getDoc(`${DISCOUNTS_CLUB_CATEGORY_URL}/${categoryId}`);

// Service to get discount club categories filtered by state
export const getDiscountClubCategoriesByStateService = async selectedState => {
  const data = await firestore
    .collection(DISCOUNTS_CLUB_CATEGORY_URL)
    .where(`quantity_per_state.${selectedState}`, '>=', 0)
    .orderBy(`quantity_per_state.${selectedState}`, 'asc')
    .get();

  return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Service to get discounts by state and category
export const getDiscountsByStateAndCategory = async (stateId, categoryId) => {
  try {
    const data = await firestore
      .collection(DISCOUNTS_CLUB_URL)
      .where('categoryId', '==', categoryId)
      .where('state', '==', stateId)
      .where('disabled', '==', false)
      .orderBy('createdAt', 'desc')
      .get();

    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Error fetching discounts by state and category:', e);
    throw e;
  }
};

// Service to create a new discount
export const createDiscountService = async values => {
  const newDiscount = await mountDiscountObject(values);
  const newsRef = getColRef(DISCOUNTS_CLUB_URL);
  return newsRef.add(newDiscount);
};

// Utility to construct the discount object
const mountDiscountObject = async values => {
  const user = getUserFromStore();
  const categoryDetails = await getSingleCategory(values.category.id);
  const stateDetails = await getSingleState(values.state);
  const address = formatAddress({
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
    categoryDetails,
    subcategory: values.subcategory,
    state: values.state,
    stateDetails,
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

// Utility to get coordinates from Google Maps API
export const getCoordinatesService = async query => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${firebaseConfig.apiKey}&address=${query}`
  );
  const { results } = await response.json();
  return results[0];
};

// Service to get address details by Brazilian postal code (CEP)
export const getAddressByCepService = async cep => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const { erro, logradouro, bairro, localidade, uf } = await response.json();

  if (!erro) {
    return { logradouro, bairro, localidade, uf };
  }
};

// Utility to format an address object into a string
export const formatAddress = ({ logradouro = '', bairro = '', localidade = '', uf = '', number = '' } = {}) => 
  `${logradouro}, ${number} ${bairro}, ${localidade} - ${uf}`.trim();
