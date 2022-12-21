import React from 'react';
import {TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import FilterIcon from '../../components/Icons/FilterIcon';
import {
  Container,
  FilterContainer,
  FilterOption,
  HeaderContainer,
  HeaderContainerText,
} from './EventsFilterSelector.style';
import {FILTERS_OPTIONS_ENUM} from '../../services/events';

const EventsFilterSelector = ({isCollapsed, onSelectFilter}) => {
  return (
    <Collapsible collapsed={isCollapsed}>
      <Container>
        <HeaderContainer>
          <FilterIcon />
          <HeaderContainerText size={18}>
            Filtre sua exibição de eventos
          </HeaderContainerText>
        </HeaderContainer>

        <FilterContainer>
          <TouchableOpacity
            onPress={() => onSelectFilter(FILTERS_OPTIONS_ENUM.all)}>
            <FilterOption size={16}>Todos</FilterOption>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSelectFilter(FILTERS_OPTIONS_ENUM.happened)}>
            <FilterOption size={16}>Eventos realizados</FilterOption>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSelectFilter(FILTERS_OPTIONS_ENUM.to_happen)}>
            <FilterOption size={16}>A realizar</FilterOption>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSelectFilter(FILTERS_OPTIONS_ENUM.attended)}>
            <FilterOption size={16}>Eventos que participei</FilterOption>
          </TouchableOpacity>
        </FilterContainer>
      </Container>
    </Collapsible>
  );
};

export default EventsFilterSelector;
