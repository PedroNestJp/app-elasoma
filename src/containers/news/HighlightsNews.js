import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Loading from '../../components/Loading';
import {getUserNewsService} from '../../services/news';
import NewsSummaryCard from './NewsSummaryCard';
import SectionTitle from './SectionTitle';
import HightlightsIcon from '../../components/Icons/HightlightsIcon';
import {Screens} from '../../contants/screens';
import {useNavigation} from '@react-navigation/native';

const HighlightsNews = ({highlights}) => {
  const navigation = useNavigation();

  const goToNewsDetail = newsId => {
    navigation.push(Screens.NEWS.navigator, {
      screen: Screens.NEWS.NEWS_DETAIL,
      params: {id: newsId},
    });
  };

  if (!highlights) return <Loading />;

  if (highlights.length > 0)
    return (
      <View>
        <SectionTitle title="DESTAQUES DO DIA" Icon={HightlightsIcon} />
        {highlights.map((highlight, index) => (
          <NewsSummaryCard
            order={index}
            key={highlight.id}
            onSelectCard={goToNewsDetail}
            news={highlight}
          />
        ))}
      </View>
    );

  return null;
};

export default HighlightsNews;
