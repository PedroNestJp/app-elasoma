import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Linking, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import HTML from 'react-native-render-html';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';
import Share from 'react-native-share';

import ScrollContainer from '../../components/Containers/ScrollContainer';
import Header from '../../containers/Header';
import {
  getSingleNewsService,
  increaseViewsService,
  updateLikesService,
} from '../../services/news';
import {notifyError} from '../../helpers/notifications';
import Text from '../../components/Typography/Text';
import {getUserFromStore} from '../../helpers/store';
import {clearString} from '../../helpers/common';
import ShareIcon from '../../components/Icons/ShareIcon';
import LikeArea from '../../containers/LikeArea';
import ListBullet from '../../components/ListBullet';

const NewsTitle = styled(Text)`
  font-weight: 600;
  font-size: 26px;
  line-height: 29px;
`;

const NewsImage = styled(Image)`
  border-radius: 5px;
  margin-top: 20px;
`;

const NewsText = styled(Text)`
  font-weight: 300;
  font-size: 18px;
  padding-top: 20px;
  line-height: 22px;
`;

const LikeAreaContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ignoredStyles = [
  'width',
  'height',
  'color',
  'font-family',
  'font-size',
  'background-color',
  'border',
  'frameBorder',
  'frame-border',
];

const defaultTags = [
  {tag: 'h1'},
  {tag: 'h2'},
  {tag: 'h3'},
  {tag: 'h4'},
  {tag: 'h5'},
  {tag: 'h6'},
  {tag: 'p'},
  {tag: 'span'},
];
const renderers = {};

defaultTags.forEach(
  ({tag}) =>
    (renderers[tag] = (htmlAttribs, children, passProps) => (
      <NewsText style={{...passProps}}>{children}</NewsText>
    )),
);

export default ({route}) => {
  const {id} = route.params;
  const [loadingNews, setLoadingNews] = useState(false);
  const [news, setNews] = useState({});
  const [width, setWidth] = useState(Dimensions.get('window').width - 48);
  const [height, setHeight] = useState(null);
  const user = getUserFromStore();

  useEffect(() => {
    getSingleNews();
  }, []);

  const getImageSize = news => {
    if (news.image && news.image !== '') {
      Image.getSize(news.image, (w, h) => {
        if (width && !height) {
          setWidth(width);
          setHeight(h * (width / w));
        } else if (!width && height) {
          setWidth(w * (height / h));
          setHeight(height);
        } else {
          setWidth(w);
          setHeight(h);
        }
      });
    }
  };

  const getSingleNews = async () => {
    try {
      setLoadingNews(true);
      const news = await getSingleNewsService(id);
      setNews(news);
      await increaseViewsService(news.id, news.views || 0);
      getImageSize(news);
      setLoadingNews(false);
    } catch (e) {
      setLoadingNews(false);
      notifyError({
        title: 'Erro',
        message:
          'Estamos com problemas para carregar a notícia, tente mais tarde',
      });
    }
  };

  const likeNews = async () => {
    const likes = news.likes && news.likes.length ? news.likes : [];

    const newLikes = likes.includes(user.id)
      ? likes.filter(like => like !== user.id)
      : likes.concat([user.id]);

    setNews({...news, likes: newLikes});
    await updateLikesService(news.id, newLikes);
  };

  const ShareContentArea = () => {
    const url = `https://noticias.sejasoma.com.br/noticia/${news.slug}`;
    const title = 'Ela Soma';
    const message = clearString(news.title);
    const subject = `Ela Soma - ${clearString(news.title)}`;

    const shareOptions = {
      title,
      message,
      url,
      subject,
    };
    return (
      <TouchableOpacity onPress={() => Share.open(shareOptions)}>
        <LikeAreaContainer>
          <ShareIcon />
        </LikeAreaContainer>
      </TouchableOpacity>
    );
  };

  const customWrapper = node => {
    if (/<\/?[a-z][\s\S]*>/i.test(news.text)) {
      return node;
    } else {
      return <NewsText>{node}</NewsText>;
    }
  };

  return (
    <>
      <Header />
      <ScrollContainer noHeaderPadding canGoBack loading={loadingNews}>
        <NewsTitle>{news.title}</NewsTitle>
        {news.image && news.image !== '' ? (
          <NewsImage style={{width, height}} source={{uri: news.image}} />
        ) : null}
        <HTML
          ignoredStyles={ignoredStyles}
          customWrapper={customWrapper}
          ignoredTags={[...IGNORED_TAGS, 'iframe']}
          listsPrefixesRenderers={{
            ul: () => <ListBullet />,
          }}
          renderers={renderers}
          html={news.text}
          onLinkPress={(evt, href) => {
            Linking.openURL(href);
          }}
          imagesMaxWidth={width}
          staticContentMaxWidth={width}
          textSelectable
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 32,
          }}>
          <LikeArea
            onPress={likeNews}
            likes={news.likes ? news.likes.length : 0}
          />
          {/* <ShareContentArea /> */}
        </View>
      </ScrollContainer>
    </>
  );
};
