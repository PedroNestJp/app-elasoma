import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components';
import {useSafeArea} from 'react-native-safe-area-context';

import {Screens} from '../../contants/screens';
import Loading from '../../components/Loading';
import Text from '../../components/Typography/Text';
import {getUserFromStore} from '../../helpers/store';
import SelectPicker from '../../components/SelectPicker';
import ButtonTag from '../../components/Buttons/ButtonTag';
import {getNewsByCategoryAndState} from '../../services/news';
import {getAreasOfInterestsService} from '../../services/interests';
import ViewContainer from '../../components/Containers/ViewContainer';
import NewsWithTitleCard from '../../containers/news/NewsWithTitleCard';
import {notifyError} from '../../helpers/notifications';

const AreasOfInterestsTagsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 24px;
`;

const NEWS_LIMIT = 5;

export default ({navigation}) => {
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [startAfter, setStartAfter] = useState(0);
  const [areas, setAreas] = useState(null);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [interest, setInterest] = useState(null);
  const [news, setNews] = useState(null);

  const user = getUserFromStore();
  const insets = useSafeArea();

  useEffect(() => {
    getAreas();
  }, []);

  useEffect(() => {
    if (orderBy && interest) {
      searchByCategory();
    }
  }, [orderBy, interest]);

  const getAreas = async () => {
    try {
      setLoadingAreas(true);
      setAreas(await getAreasOfInterestsService());
      setLoadingAreas(false);
    } catch (e) {
      setLoadingAreas(false);
    }
  };

  const searchByCategory = async () => {
    try {
      setLoadingNews(true);
      setStartAfter(undefined);
      const request = await getNewsByCategoryAndState(interest, {
        orderBy,
        limit: NEWS_LIMIT,
      });
      setNews(request.news);
      setStartAfter(request.lastOne);
      setLoadingNews(false);
    } catch (e) {
      console.log(e);
      setLoadingNews(false);
      notifyError({
        title: 'Erro',
        message:
          'Estamos com problemas para carregar as notícias, tente mais tarde',
      });
    }
  };

  const getMoreNews = async () => {
    try {
      if (startAfter) {
        setRefreshing(true);
        const moreNewsResult = await getNewsByCategoryAndState(interest, {
          orderBy,
          startAfter,
          limit: NEWS_LIMIT,
        });
        setNews(news.concat(moreNewsResult.news));
        setStartAfter(moreNewsResult.lastOne);
        setRefreshing(false);
      }
    } catch (e) {
      setRefreshing(false);
    }
  };

  const goToNewsDetail = newsId => {
    navigation.push(Screens.NEWS.navigator, {
      screen: Screens.NEWS.NEWS_DETAIL,
      params: {id: newsId},
    });
  };

  const AreasOfInterestsTags = () => (
    <AreasOfInterestsTagsContainer>
      {!areas ? (
        <Loading />
      ) : (
        areas.map(area => (
          <View style={{margin: 5}} key={area.id}>
            <ButtonTag
              onPress={() => {
                setInterest(area);
                setStartAfter(0);
              }}
              text={area.name}
              color={area.color}
            />
          </View>
        ))
      )}
    </AreasOfInterestsTagsContainer>
  );

  const Filter = () => (
    <View style={{marginVertical: 10, marginHorizontal: 24}}>
      <SelectPicker
        useNativeAndroidPickerStyle={false}
        placeholder={{label: 'Filtros', value: null, color: '#9EA0A4'}}
        value={orderBy}
        // onClear={() => {
        //   setNews(null);
        //   setInterest(null);
        // }}
        onValueChange={v => setOrderBy(v)}
        items={[
          {label: 'Mais Recentes', value: 'createdAt'},
          {label: 'Mais Curtidas', value: 'likesQuantity'},
          {label: 'Mais Vistas', value: 'views'},
        ]}
      />
    </View>
  );

  if (!news)
    return (
      <ViewContainer
        noPaddingHorizontal
        loading={loadingAreas || loadingNews}
        style={{paddingTop: insets.top + 24}}
        canGoBackStyle={{paddingHorizontal: 24}}
        canGoBack>
        <AreasOfInterestsTags />
      </ViewContainer>
    );

  return (
    <ViewContainer
      noPaddingHorizontal
      style={{paddingTop: insets.top + 24}}
      canGoBackStyle={{paddingHorizontal: 24}}
      canGoBack>
      <Filter />
      <ViewContainer noPaddingHorizontal loading={loadingNews}>
        {!loadingNews && (
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={getMoreNews}
            refreshing={refreshing}
            ListEmptyComponent={() => (
              <Text style={{padding: 24}}>Nenhum resultado foi encontrado</Text>
            )}
            data={news}
            renderItem={({item}) => (
              <NewsWithTitleCard
                key={item.id}
                onSelectCard={goToNewsDetail}
                news={item}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </ViewContainer>
    </ViewContainer>
  );
};
