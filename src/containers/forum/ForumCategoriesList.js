import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Chip from '../../components/Chip';
import {notifyError} from '../../helpers/notifications';
import {getForumCategoriesService} from '../../services/forum/forum';
import Loading from '../../components/Loading';

const ChipContainer = styled(TouchableOpacity)`
  padding: 10px 10px 10px 0px;
`;

export default ({selectedCategoryId, onSelectCategory, type = 'flatlist'}) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, isLoadingCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      isLoadingCategories(true);
      const categories = await getForumCategoriesService();
      setCategories(categories);
      onSelectCategory(categories[0]);
      isLoadingCategories(false);
    } catch (e) {
      isLoadingCategories(false);
      notifyError({title: 'Estamos com alguns problemas, tente mais tarde'});
    }
  };

  const CategoryChip = ({category, index}) => (
    <ChipContainer
      onPress={() => onSelectCategory(category)}
      style={{
        paddingLeft: index === 0 ? 24 : 10,
        paddingRight: index === categories.length - 1 ? 24 : 10,
      }}>
      <Chip
        text={category.name.toLowerCase()}
        active={category.id === selectedCategoryId}
      />
    </ChipContainer>
  );

  if (loadingCategories) return <Loading />;

  if (type === 'list') {
    return categories.map(item => (
      <CategoryChip key={item.id} category={item} />
    ));
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <CategoryChip index={index} category={item} key={item.id} />
      )}
    />
  );
};
