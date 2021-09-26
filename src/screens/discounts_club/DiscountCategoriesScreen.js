import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Text from '../../components/Typography/Text';
import {getUserFromStore} from '../../helpers/store';
import SelectPicker from '../../components/SelectPicker';
import ViewContainer from '../../components/Containers/ViewContainer';
import StateSelector from '../../containers/forms/StateSelector';
import {
  getDiscountClubCategoriesByStateService,
  getDiscountsByStateAndCategory,
} from '../../services/discountClub';
import DiscountCard from '../../containers/discountsClub/DiscountCard';

export default ({navigation}) => {
  const user = getUserFromStore();

  const [selectedState, setSelectedState] = useState(user.state);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);

  const insets = useSafeArea();

  useEffect(() => {
    getCategories();
  }, [selectedState]);

  useEffect(() => {
    loadCategoryDiscounts();
  }, [selectedCategory]);

  const getCategories = async () => {
    setDiscounts([]);
    const categories = await getDiscountClubCategoriesByStateService(
      selectedState,
    );

    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
    setCategories(categories);
  };

  const loadCategoryDiscounts = async () => {
    try {
      setLoadingDiscounts(true);
      const discounts = await getDiscountsByStateAndCategory(
        selectedState,
        selectedCategory,
      );
      setDiscounts(discounts);
      setLoadingDiscounts(false);
    } catch (e) {
      setLoadingDiscounts(false);
    }
  };

  const filterByState = async stateId => {
    setSelectedState(stateId);
  };

  const StateFilter = () => (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 34,
        minWidth: Dimensions.get('window').width / 2 - 10,
      }}>
      <StateSelector onValueChange={filterByState} selected={selectedState} />
    </View>
  );

  const CategoryFilter = () => (
    <View
      style={{
        marginLeft: 24,
        marginRight: 10,
        minWidth: Dimensions.get('window').width / 2 - 10,
      }}>
      <SelectPicker
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: 'Categoria',
          value: null,
          color: '#9EA0A4',
        }}
        value={selectedCategory}
        onValueChange={v => setSelectedCategory(v)}
        items={categories.map(category => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </View>
  );

  return (
    <ViewContainer
      noPaddingHorizontal
      style={{paddingTop: insets.top + 24}}
      canGoBackStyle={{paddingHorizontal: 24}}
      canGoBack>
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CategoryFilter />
        <StateFilter />
      </View>
      <ViewContainer noPaddingHorizontal loading={loadingDiscounts}>
        <FlatList
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
    </ViewContainer>
  );
};
