import React from 'react';
import {FlatList} from 'react-native';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import AffiliatedCard from '../../containers/affiliated/AffiliatedCard';

export default ({route}) => {
  const {people} = route.params;

  return (
    <>
      <Header />
      <ViewContainer
        canGoBack
        noPaddingHorizontal
        canGoBackStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 12,
        }}>
        <FlatList
          ListEmptyComponent={() => (
            <Text style={{padding: 24}}>
              Nenhum pessoa confirmada no evento
            </Text>
          )}
          data={people}
          renderItem={({item}) => (
            <AffiliatedCard person={item} key={item.id} />
          )}
          keyExtractor={item => item.id}
        />
      </ViewContainer>
    </>
  );
};
