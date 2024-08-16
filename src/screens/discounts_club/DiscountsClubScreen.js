import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';

import { getUserFromStore } from '../../helpers/store';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import { getDiscountClubCategoriesByStateService, getDiscountsByStateAndCategory } from '../../services/discountClub';
import DiscountsClubCarrousel from '../../containers/discountsClub/DiscountsClubCarrousel';
import DiscountCard from '../../containers/discountsClub/DiscountCard';
import Loading from '../../components/Loading';
import TextButton from '../../components/Buttons/TextButton';
import StateSelector from '../../containers/forms/StateSelector';
import { Screens } from '../../contants/screens';

// Hook personalizado para gerenciamento de estado e chamadas API
const useDiscountsClub = (selectedState) => {
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const fetchedCategories = await getDiscountClubCategoriesByStateService(selectedState);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoadingCategories(false);
    }
  }, [selectedState]);

  const loadCategoryDiscounts = useCallback(async (category) => {
    setLoadingDiscounts(true);
    try {
      const fetchedDiscounts = await getDiscountsByStateAndCategory(selectedState, category.id);
      setDiscounts(fetchedDiscounts);
    } catch (error) {
      console.error('Erro ao carregar descontos:', error);
    } finally {
      setLoadingDiscounts(false);
    }
  }, [selectedState]);

  useEffect(() => {
    fetchCategories();
  }, [selectedState, fetchCategories]);

  return {
    loadingDiscounts,
    loadingCategories,
    discounts,
    categories,
    loadCategoryDiscounts,
  };
};

const DiscountsClubScreen = ({ navigation }) => {
  const user = getUserFromStore();
  const [selectedState, setSelectedState] = useState(user.state);

  const { loadingDiscounts, loadingCategories, discounts, categories, loadCategoryDiscounts } = useDiscountsClub(selectedState);

  const handleStateChange = useCallback(stateId => {
    setSelectedState(stateId);
  }, []);

  const navigateToCategoriesScreen = useCallback(() => {
    navigation.push(Screens.DISCOUNTS_CLUB.navigator, {
      screen: Screens.DISCOUNTS_CLUB.DISCOUNT_CATEGORIES_SCREEN,
    });
  }, [navigation]);

  const renderEventsFilters = useMemo(() => (
    <View style={styles.eventsFiltersContainer}>
      <StateSelector onValueChange={handleStateChange} selected={selectedState} />
    </View>
  ), [handleStateChange, selectedState]);

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
              <View style={styles.headerContainer}>
                <View style={styles.headerTopRow}>
                  <TextButton
                    style={styles.categoryButton}
                    text="Categorias"
                    onPress={navigateToCategoriesScreen}
                  />
                  {renderEventsFilters}
                </View>
                {categories.length > 0 && (
                  <DiscountsClubCarrousel
                    onChange={loadCategoryDiscounts}
                    categories={categories}
                  />
                )}
              </View>
            )
          }
          ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum resultado foi encontrado</Text>}
          data={discounts}
          renderItem={({ item }) => <DiscountCard discount={item} />}
          keyExtractor={item => item.id}
        />
      </ViewContainer>
    </>
  );
};

// Estilos utilizando StyleSheet nativo
const styles = StyleSheet.create({
  eventsFiltersContainer: {
    paddingLeft: 10,
    paddingRight: 34,
    minWidth: Dimensions.get('window').width / 2 - 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTopRow: {
    paddingBottom: 24,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  categoryButton: {
    marginLeft: 24,
    marginRight: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    minWidth: Dimensions.get('window').width / 2 - 10,
  },
  emptyText: {
    padding: 24,
  },
});

export default DiscountsClubScreen;
