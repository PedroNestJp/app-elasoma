import React, {useEffect, useState} from 'react';
import {FlatList, View, Dimensions} from 'react-native';

import {getUserFromStore} from '../../helpers/store';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import {getEventsByStateService} from '../../services/events';
import StateSelector from '../../containers/forms/StateSelector';
import {
  getDiscountClubCategoriesByStateService,
  getDiscountsByStateAndCategory,
} from '../../services/discountClub';
import DiscountsClubCarrousel from '../../containers/discountsClub/DiscountsClubCarrousel';
import DiscountCard from '../../containers/discountsClub/DiscountCard';
import Loading from '../../components/Loading';
import Button from '../../components/Buttons/Button';
import {Screens} from '../../contants/screens';
import TextButton from '../../components/Buttons/TextButton';

export default ({navigation}) => {
  const user = getUserFromStore();

  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState(null);

  const [selectedState, setSelectedState] = useState(user.state);

  useEffect(() => {
    getCategories();
  }, [selectedState]);

  const loadCategoryDiscounts = async category => {
    try {
      setLoadingDiscounts(true);
      const discounts = await getDiscountsByStateAndCategory(
        selectedState,
        category.id,
      );
      setDiscounts(discounts);
      setLoadingDiscounts(false);
    } catch (e) {
      setLoadingDiscounts(false);
    }
  };

  const getCategories = async () => {
    try {
      setDiscounts([]);
      setLoadingCategories(true);
      const categories = await getDiscountClubCategoriesByStateService(
        selectedState,
      );
      setCategories(categories);
      setLoadingCategories(false);
    } catch (e) {
      setLoadingCategories(false);
    }
  };

  const filterByState = async stateId => {
    setSelectedState(stateId);
  };

  const EventsFilters = () => {
    return (
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 34,
          minWidth: Dimensions.get('window').width / 2 - 10,
        }}>
        <StateSelector onValueChange={filterByState} selected={selectedState} />
      </View>
    );
  };

  const goToCategoriesScreen = () => {
    navigation.push(Screens.DISCOUNTS_CLUB.navigator, {
      screen: Screens.DISCOUNTS_CLUB.DISCOUNT_CATEGORIES_SCREEN,
    });
  };

  return (
    <>
      <Header />
      <ViewContainer noPaddingHorizontal>
        <FlatList
          refreshing={loadingDiscounts}
          ListHeaderComponent={
            loadingCategories ? (
              <Loading />
            ) : (
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    paddingBottom: 24,
                    paddingTop: 12,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <TextButton
                    style={{
                      marginLeft: 24,
                      marginRight: 10,
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      minWidth: Dimensions.get('window').width / 2 - 10,
                    }}
                    text="Categorias"
                    onPress={goToCategoriesScreen}
                  />
                  <EventsFilters />
                </View>
                {!loadingCategories && categories && categories.length > 0 && (
                  <DiscountsClubCarrousel
                    onChange={loadCategoryDiscounts}
                    categories={categories}
                  />
                )}
              </View>
            )
          }
          ListEmptyComponent={() => (
            <Text style={{padding: 24}}>Nenhum resultado foi encontrado</Text>
          )}
          data={discounts}
          renderItem={({item}) => (
            <DiscountCard key={item.id} discount={item} />
          )}
          keyExtractor={item => item.id}
        />
      </ViewContainer>
    </>
  );
};
