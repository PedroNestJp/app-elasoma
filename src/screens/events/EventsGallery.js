import React, {useRef, useState} from 'react';
import ViewContainer from '../../components/Containers/ViewContainer';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Typography/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import CloseIcon from '../../components/Icons/CloseIcon';
import {
  FooterContainer,
  GalleryContainer,
  HeaderContainer,
  ImageSrc,
  ImageSrcContainer,
} from './EventGallery.styles';
import Carousel from 'react-native-snap-carousel';
import TextButton from '../../components/Buttons/TextButton';
import {downloadImageFromURL} from '../../services/storage';
import {showToastError, showToastSuccess} from '../../helpers/notifications';
import Loading from '../../components/Loading';
import {catchError} from '../../helpers/errors';

const screenWidth = Dimensions.get('screen').width;

export default ({route, navigation}) => {
  const {imageIndex, gallery} = route.params;
  const [activeSlideIndex, setActiveSlideIndex] = useState(imageIndex || 0);
  const [downloading, setDownloading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(gallery[imageIndex || 0]);
  const carouselRef = useRef(null);

  const downloadActiveImage = async () => {
    try {
      setDownloading(true);
      await downloadImageFromURL(activeSlide);
      showToastSuccess('A imagem foi baixada para o dispositivo');
      setDownloading(false);
    } catch (e) {
      catchError(e);
      setDownloading(false);
      showToastError('Houve um problema ao baixar o arquivo');
    }
  };

  const onSnapToItem = index => {
    setActiveSlide(gallery[index]);
    setActiveSlideIndex(index);
  };

  return (
    <ViewContainer noPaddingHorizontal>
      <SafeAreaView>
        <HeaderContainer>
          <View style={{flexGrow: 2, alignItems: 'center'}}>
            <Text size={18}>Imagens do Evento</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <CloseIcon />
          </TouchableOpacity>
        </HeaderContainer>
        <GalleryContainer>
          <Carousel
            enableSnap
            firstItem={imageIndex || 0}
            activeSlideOffset={0}
            ref={carouselRef}
            data={gallery}
            layout={'default'}
            renderItem={({item}) => <GalleryImage item={item} />}
            sliderWidth={screenWidth}
            itemWidth={screenWidth / 1.2}
            onSnapToItem={onSnapToItem}
          />
        </GalleryContainer>
        <FooterContainer>
          <View>
            <Text size={14}>
              {activeSlideIndex + 1}/{gallery.length}
            </Text>
          </View>
          <View>
            <TextButton
              loading={downloading}
              disabled={downloading}
              onPress={downloadActiveImage}
              text="Baixar Imagem"
              icon="download"
            />
          </View>
        </FooterContainer>
      </SafeAreaView>
    </ViewContainer>
  );
};

class GalleryImage extends React.Component {
  state = {loading: true};

  render() {
    const {loading} = this.state;
    const {item} = this.props;

    return (
      <ImageSrcContainer>
        {loading && (
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <Loading />
          </View>
        )}
        <ImageSrc
          onLayout={() => this.setState({loading: false})}
          source={{uri: item.url}}
        />
      </ImageSrcContainer>
    );
  }
}
