import React, {useEffect, useState} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';

import {getUserFromStore} from '../../helpers/store';
import ViewContainer from '../../components/Containers/ViewContainer';
import Text from '../../components/Typography/Text';
import Header from '../../containers/Header';
import EventCard from '../../containers/events/EventCard';
import {
  getEventsByStateService,
  getSpotlightsEventsByStateService,
} from '../../services/events';
import SpotlightCarrousel from '../../containers/events/SpotlightCarrousel';
import StateSelector from '../../containers/forms/StateSelector';
import FilterIcon from '../../components/Icons/FilterIcon';
import EventsFilterSelector from '../../containers/events/EventsFilterSelector';
import {catchError} from '../../helpers/errors';

export default ({navigation}) => {
  const user = getUserFromStore();

  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingSpotlights, setLoadingSpotlights] = useState(false);
  const [events, setEvents] = useState(null);
  const [spotlights, setSpotlights] = useState(null);
  const [selectedState, setSelectedState] = useState(user.state);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getSpotlights();
  }, [selectedState]);

  useEffect(() => {
    getEvents();
  }, [filter, selectedState]);

  const getEvents = async () => {
    try {
      setLoadingEvents(true);
      const events = await getEventsByStateService(
        selectedState || user.stateData.id,
        filter,
      );
      setEvents(events);
      setLoadingEvents(false);
    } catch (e) {
      catchError(e);
      setLoadingEvents(false);
    }
  };

  const getSpotlights = async () => {
    try {
      setLoadingSpotlights(true);
      const spotlights = await getSpotlightsEventsByStateService(
        selectedState || user.stateData.id,
      );
      setSpotlights(spotlights);
      setLoadingSpotlights(false);
    } catch (e) {
      catchError(e);
      setLoadingSpotlights(false);
    }
  };

  const filterByState = async stateId => {
    setSelectedState(stateId);
    setFilter(null);
  };

  const ScreenHeader = () => (
    <ViewContainer noPaddingHorizontal loading={loadingSpotlights}>
      {!loadingSpotlights && spotlights && spotlights.length > 0 && (
        <SpotlightCarrousel navigation={navigation} spotlights={spotlights} />
      )}
      <View style={{paddingBottom: 24, paddingTop: 12}}>
        <EventsFilters
          onSelectFilter={setFilter}
          onSelectState={filterByState}
          selectedState={selectedState}
        />
      </View>
    </ViewContainer>
  );

  return (
    <>
      <Header />

      <ViewContainer noPaddingHorizontal loading={loadingEvents}>
        {!loadingEvents && (
          <FlatList
            ListHeaderComponent={<ScreenHeader />}
            ListEmptyComponent={() => (
              <Text style={{padding: 24}}>Nenhum resultado foi encontrado</Text>
            )}
            data={events}
            renderItem={({item}) => <EventCard key={item.id} event={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </ViewContainer>
    </>
  );
};

const EventsFilters = ({onSelectState, selectedState, onSelectFilter}) => {
  const [collapsedFilterSelector, isCollapsedFilterSelector] = useState(true);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexGrow: 2}}>
          <StateSelector
            onValueChange={onSelectState}
            selected={selectedState}
          />
        </View>
        <View style={{marginLeft: 10, marginTop: 10}}>
          <TouchableOpacity
            onPress={() => isCollapsedFilterSelector(!collapsedFilterSelector)}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
      <EventsFilterSelector
        onSelectFilter={onSelectFilter}
        isCollapsed={collapsedFilterSelector}
      />
    </View>
  );
};
