import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import Text from '../../components/Typography/Text';
import { getUserFromStore } from '../../helpers/store';
import SelectPicker from '../../components/SelectPicker';
import ViewContainer from '../../components/Containers/ViewContainer';
import StateSelector from '../../containers/forms/StateSelector';
import { getDiscountClubCategoriesByStateService, getDiscountsByStateAndCategory } from '../../services/discountClub';
import DiscountCard from '../../containers/discountsClub/DiscountCard';

// Componente principal
const DiscountsScreen = ({ navigation }) => {
  const user = getUserFromStore();
  const insets = useSafeAreaInsets();

  const [selectedState, setSelectedState] = useState(user.state);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);

  // Função para buscar categorias
  const getCategories = useCallback(async () => {
    try {
      const fetchedCategories = await getDiscountClubCategoriesByStateService(selectedState);
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setSelectedCategory(fetchedCategories[0].id);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }, [selectedState]);

  // Função para buscar descontos da categoria selecionada
  const loadCategoryDiscounts = useCallback(async () => {
    if (!selectedCategory) return;

    setLoadingDiscounts(true);
    try {
      const fetchedDiscounts = await getDiscountsByStateAndCategory(selectedState, selectedCategory);
      setDiscounts(fetchedDiscounts);
    } catch (error) {
      console.error('Erro ao carregar descontos:', error);
    } finally {
      setLoadingDiscounts(false);
    }
  }, [selectedState, selectedCategory]);

  // Efeitos para buscar categorias e descontos
  useEffect(() => {
    getCategories();
  }, [selectedState, getCategories]);

  useEffect(() => {
    loadCategoryDiscounts();
  }, [selectedCategory, loadCategoryDiscounts]);

  // Função para atualizar o estado selecionado
  const handleStateChange = useCallback((stateId) => {
    setSelectedState(stateId);
  }, []);

  // Função para atualizar a categoria selecionada
  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  // Renderização dos filtros
  const renderStateFilter = useMemo(() => (
    <View style={styles.stateFilterContainer}>
      <StateSelector onValueChange={handleStateChange} selected={selectedState} />
    </View>
  ), [handleStateChange, selectedState]);

  const renderCategoryFilter = useMemo(() => (
    <View style={styles.categoryFilterContainer}>
      <SelectPicker
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: 'Categoria', value: null, color: '#9EA0A4' }}
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        items={categories.map(category => ({ label: category.name, value: category.id }))}
      />
    </View>
  ), [categories, selectedCategory, handleCategoryChange]);

  return (
    <ViewContainer
      noPaddingHorizontal
      style={{ paddingTop: insets.top + 24 }}
      canGoBackStyle={{ paddingHorizontal: 24 }}
      canGoBack
    >
      <View style={styles.filtersContainer}>
        {renderCategoryFilter}
        {renderStateFilter}
      </View>

      <ViewContainer noPaddingHorizontal loading={loadingDiscounts}>
        <FlatList
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum resultado foi encontrado</Text>
          )}
          data={discounts}
          renderItem={({ item }) => <DiscountCard discount={item} />}
          keyExtractor={item => item.id}
        />
      </ViewContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateFilterContainer: {
    paddingLeft: 10,
    paddingRight: 34,
    minWidth: Dimensions.get('window').width / 2 - 10,
  },
  categoryFilterContainer: {
    marginLeft: 24,
    marginRight: 10,
    minWidth: Dimensions.get('window').width / 2 - 10,
  },
  emptyText: {
    padding: 24,
  },
});

export default DiscountsScreen;
