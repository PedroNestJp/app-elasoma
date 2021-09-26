import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import Chip from '../../components/Chip';
import {notifyError} from '../../helpers/notifications';
import {getForumCategoriesByStateService} from '../../services/forum/forum';
import Loading from '../../components/Loading';
import Text from '../../components/Typography/Text';
import ViewContainer from '../../components/Containers/ViewContainer';

const ChipContainer = styled(TouchableOpacity)`
  padding: 10px 10px 10px 0px;
`;

export default ({
  stateId,
  selectedCategoryId,
  onSelectCategory,
  type = 'flatlist',
}) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, isLoadingCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, [stateId]);

  const getCategories = async () => {
    try {
      isLoadingCategories(true);
      const categories = await getForumCategoriesByStateService(stateId);
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

  if (!categories || categories.length <= 0)
    return (
      <ViewContainer>
        <Text>Sem categorias para exibir</Text>
      </ViewContainer>
    );

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
