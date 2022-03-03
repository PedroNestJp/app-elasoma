import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import AffiliatedCard from '../../containers/affiliated/AffiliatedCard';
import {Screens} from '../../contants/screens';
import {getUserFromStore} from '../../helpers/store';
import {getAffiliatedsPerCityService, getAffiliatedsService} from '../../services/affiliated';
import StateSelector from '../../containers/forms/StateSelector';
import CitySelector from '../../containers/forms/CitySelector';
import SegmentSelector from '../../containers/forms/SegmentSelector';

const NEWS_LIMIT = 10;

export default ({navigation}) => {
  const user = getUserFromStore();

  const [loadingPeople, setLoadingPeople] = useState(false);
  const [loadingMorePeople, setLoadingMorePeople] = useState(false);
  const [people, setPeople] = useState(null);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState('');
  const [segment, setSegment] = useState('');
  const [startAfter, setStartAfter] = useState(null);

  useEffect(() => {
    getAffiliated();
  }, [city, state, segment]);

  //separando por etapas

  const getAffiliatedPerCity = async () => {
    try {
      setLoadingPeople(true);
      const request = await getAffiliatedsPerCityService({
        city,
        limit: NEWS_LIMIT,
        startAfter,
        segment
      });
      setPeople(request.affiliateds);
      setStartAfter(request.lastOne);
      setLoadingPeople(false);
    } catch (e) {
      console.log(e)
      setLoadingPeople(false);
    }
  };

  const getAffiliatedPerState = async () => {
    try {
      setLoadingPeople(true);
      const request = await getAffiliatedsService({
        state,
        limit: NEWS_LIMIT,
        startAfter,
        segment
      });
      setPeople(request.affiliateds);
      setStartAfter(request.lastOne);
      setLoadingPeople(false);
    } catch (e) {
      console.log(e)
      setLoadingPeople(false);
    }
  };

  //fim separados

  const getMoreAffiliated = async () => {
    try {
      if (startAfter) {
        setLoadingMorePeople(true);
        let request = {};
        if (city){
          request = await getAffiliatedsPerCityService({
            city,
            limit: NEWS_LIMIT,
            startAfter,
            segment
          });
        }
       
        else{
           request = await getAffiliatedsService({
            state,
            limit: NEWS_LIMIT,
            startAfter,
            segment
          });
        }

        setPeople(people.concat(request.affiliateds));
        setStartAfter(request.lastOne);
        setLoadingMorePeople(false);
      }
    } catch (e) {
      console.log(e);
      setLoadingMorePeople(false);
    }
  };

  const getAffiliated = async () => {
    if (!city) {
      getAffiliatedPerState();
    }
    else{
      getAffiliatedPerCity();
    }
  };
  const Filter = () => (
    <View style={{marginVertical: 10, marginHorizontal: 24}}>
      <StateSelector
        onValueChange={state => {setState(state); setCity('')}}
        selected={state}
      />

      <CitySelector
        onValueChange={city => setCity(city)}
        selected={city}
        stateId={state}
      />

<SegmentSelector
        onValueChange={segment => setSegment(segment)}
        selected={segment}
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
            scrollIndicatorInsets={{right: Number.MIN_VALUE}}
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
