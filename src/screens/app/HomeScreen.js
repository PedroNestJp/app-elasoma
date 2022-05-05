import React, {useEffect, useState} from 'react';
import {FlatList, Modal, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../containers/Header';
import {Screens} from '../../contants/screens';
import Text from '../../components/Typography/Text';
import {getUserNewsService} from '../../services/news';
import {notifyError} from '../../helpers/notifications';
import TextButton from '../../components/Buttons/TextButton';
import NewsSummaryCard from '../../containers/news/NewsSummaryCard';
import ViewContainer from '../../components/Containers/ViewContainer';
import {useSelector} from 'react-redux';
import HighlightsNews from '../../containers/news/HighlightsNews';
import SectionTitle from '../../containers/news/SectionTitle';
import CupIcon from '../../components/Icons/CupIcon';
import {catchError} from '../../helpers/errors';
import TermsOfUse from '../../components/TermsOfUse';

const NEWS_LIMIT = 5;

export default ({navigation}) => {
  const [loadingNews, setLoadingNews] = useState(false);
  const [news, setNews] = useState(null);
  const [highlights, setHighlights] = useState(null);
  const [modalTerms, setModalTerms] = useState(false);

  const [startAfter, setStartAfter] = useState(null);
  const {user} = useSelector(state => state.auth);
  const {terms} = user;

  console.log(modalTerms, 'State Modal');

  useEffect(() => {
    if (terms === false) {
      setModalTerms(true);
    }
  }, []);

  useEffect(() => {
    getNewsAndHighlights();
  }, [user]);

  const getNewsAndHighlights = () => {
    try {
      getUserNews();
      getHighlights();
    } catch (e) {
      catchError(e);
    }
  };

  const getHighlights = async () => {
    const request = await getUserNewsService({
      filters: {highlight: true},
    });
    setHighlights(request?.news);
  };

  const getUserNews = async () => {
    try {
      setLoadingNews(true);
      const request = await getUserNewsService({
        limit: NEWS_LIMIT,
        startAfter: null,
        filters: {highlight: false},
      });
      setNews(request?.news);
      setStartAfter(request?.lastOne);
      setLoadingNews(false);
    } catch (e) {
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
        setLoadingNews(true);
        const request = await getUserNewsService({
          limit: NEWS_LIMIT,
          startAfter,
          filters: {highlight: false},
        });
        setNews(news.concat(request?.news));
        setStartAfter(request?.lastOne);
        setLoadingNews(false);
      }
    } catch (e) {
      setLoadingNews(false);
      notifyError({
        title: 'Erro',
        message:
          'Estamos com problemas para carregar as notícias, tente mais tarde',
      });
    }
  };

  const goToNewsDetail = newsId => {
    navigation.push(Screens.NEWS.navigator, {
      screen: Screens.NEWS.NEWS_DETAIL,
      params: {id: newsId},
    });
  };

  const EmptyNewsList = () => (
    <ViewContainer style={{paddingTop: 24}}>
      <Text size={15} fontStyle={600}>
        Não temos nenhuma notícia para exibir.
      </Text>
      <Text>
        As notícias exibidas são baseadas no seu estado e em suas áreas de
        interesse.
      </Text>
      <Text style={{paddingTop: 24}} fontStyle={600}>
        Tente:
      </Text>
      <TextButton onPress={getUserNews} underline text="Recarregar" />
      <TextButton
        onPress={() =>
          navigation.push(Screens.NEWS.navigator, {
            screen: Screens.NEWS.INTERESTS_SCREEN,
          })
        }
        underline
        text="Atualizar Áreas de Interesse"
      />
      <TextButton
        onPress={() =>
          navigation.push(Screens.APP.navigator, {
            screen: Screens.APP.EDIT_PROFILE_SCREEN,
          })
        }
        underline
        text="Editar seu perfil"
      />
    </ViewContainer>
  );

  const handleCloseSelectCategoryModal = () => {
    setModalTerms(false);
  };

  return (
    <>
      <Header />
      <ViewContainer noPaddingHorizontal loading={!news}>
        <FlatList
          data={news}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <EmptyNewsList navigation={navigation} />}
          onEndReached={getMoreNews}
          onEndReachedThreshold={0.5}
          onRefresh={getNewsAndHighlights}
          ListHeaderComponent={
            <>
              <HighlightsNews highlights={highlights} />
              <SectionTitle Icon={CupIcon} title="ÚLTIMAS NOTÍCIAS" />
            </>
          }
          refreshing={loadingNews}
          renderItem={({item, index}) => (
            <NewsSummaryCard
              order={index}
              key={item.id}
              onSelectCard={goToNewsDetail}
              news={item}
            />
          )}
        />

        <Modal animationType="fade" visible={modalTerms}>
          <TermsOfUse closeModal={handleCloseSelectCategoryModal} />
        </Modal>
      </ViewContainer>
    </>
  );
};
