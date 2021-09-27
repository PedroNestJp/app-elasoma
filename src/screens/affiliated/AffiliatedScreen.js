import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import AffiliatedCard from '../../containers/affiliated/AffiliatedCard';
import {Screens} from '../../contants/screens';
import {getUserFromStore} from '../../helpers/store';
import {getAffiliatedsService} from '../../services/affiliated';
import StateSelector from '../../containers/forms/StateSelector';

const NEWS_LIMIT = 10;

export default ({navigation}) => {
  const user = getUserFromStore();

  const [loadingPeople, setLoadingPeople] = useState(false);
  const [loadingMorePeople, setLoadingMorePeople] = useState(false);
  const [people, setPeople] = useState(null);
  const [state, setState] = useState(user.state);
  const [startAfter, setStartAfter] = useState(null);

  useEffect(() => {
    getAffiliated();
  }, [state]);

  const getAffiliated = async () => {
    try {
      setLoadingPeople(true);
      const request = await getAffiliatedsService({
        state,
        limit: NEWS_LIMIT,
        startAfter,
      });
      setPeople(request.affiliateds);
      setStartAfter(request.lastOne);
      setLoadingPeople(false);
    } catch (e) {
      setLoadingPeople(false);
    }
  };

  const getMoreAffiliated = async () => {
    try {
      if (startAfter) {
        setLoadingMorePeople(true);
        const request = await getAffiliatedsService({
          state,
          limit: NEWS_LIMIT,
          startAfter,
        });
        setPeople(people.concat(request.affiliateds));
        setStartAfter(request.lastOne);
        setLoadingMorePeople(false);
      }
    } catch (e) {
      setLoadingMorePeople(false);
    }
  };

  const Filter = () => (
    <View style={{marginVertical: 10, marginHorizontal: 24}}>
      <StateSelector
        onValueChange={state => setState(state)}
        selected={state}
      />
    </View>
  );

  const goToAffiliated = person => {
    navigation.push(Screens.AFFILIATED.navigator, {
      screen: Screens.AFFILIATED.AFFILIATED_DETAILS,
      params: {person},
    });
  };

  return (
    <>
      <Header />
      <ViewContainer noPaddingHorizontal>
        <Filter />
        <ViewContainer
          style={{marginTop: 20}}
          loading={loadingPeople}
          noPaddingHorizontal>
          <FlatList
            onEndReached={getMoreAffiliated}
            onEndReachedThreshold={0.5}
            onRefresh={getAffiliated}
            ListEmptyComponent={() => (
              <Text style={{padding: 24}}>Nenhum afiliado encontrado</Text>
            )}
            refreshing={loadingMorePeople}
            data={people}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => goToAffiliated(item)}>
                <AffiliatedCard person={item} key={item.id} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </ViewContainer>
      </ViewContainer>
    </>
  );
};
