import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Typography/Text';
import {showToastError} from '../../helpers/notifications';
import {catchError} from '../../helpers/errors';
import ViewContainer from '../../components/Containers/ViewContainer';
import {getEventGalleryService} from '../../services/events';
import {
  ImageThumbnail,
  ImageThumbnailContainer,
  MoreImagesContainer,
  ThumbnailsContainer,
} from './EventGallery.styles';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../contants/screens';
import Loading from '../../components/Loading';

const EventGallery = ({event}) => {
  const [loading, isLoading] = useState(false);
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    getEventGallery();
  }, []);

  const getEventGallery = async () => {
    try {
      isLoading(true);
      const gallery = await getEventGalleryService(event.id);
      setGallery(gallery);
      isLoading(false);
    } catch (e) {
      catchError(e, 'EventGallery->getEventGallery');
      showToastError(
        'Estamos com problema para carregar a galeria de imagens do evento. Tente mais tarde',
      );
      isLoading(false);
    }
  };

  return (
    <ViewContainer noPaddingHorizontal loading={loading}>
      {!gallery || gallery.length <= 0 ? null : (
        <GalleryGrid gallery={gallery} />
      )}
    </ViewContainer>
  );
};

const GalleryGrid = ({gallery}) => {
  const navigation = useNavigation();
  const shown = gallery.slice(0, 3);

  const goToGalleryScreen = imageIndex => {
    navigation.navigate(Screens.EVENTS.navigator, {
      screen: Screens.EVENTS.EVENT_GALLERY_SCREEN,
      params: {imageIndex, gallery},
    });
  };
  return (
    <View>
      <ViewContainer>
        <Text size={18}>Imagens do Evento</Text>
      </ViewContainer>

      <ScrollView horizontal>
        <ThumbnailsContainer>
          {shown.map((image, index) => (
            <EventThumbnail
              onPress={() => goToGalleryScreen(index)}
              image={image}
            />
          ))}
          {gallery.length > 3 && (
            <TouchableOpacity onPress={() => goToGalleryScreen(3)}>
              <View style={{position: 'relative'}}>
                <EventThumbnail
                  onPress={() => goToGalleryScreen(3)}
                  image={gallery[3]}
                />
                <MoreImagesContainer>
                  <Text size={20} style={{color: '#fff'}}>
                    +{gallery.length - 3}
                  </Text>
                </MoreImagesContainer>
              </View>
            </TouchableOpacity>
          )}
        </ThumbnailsContainer>
      </ScrollView>
    </View>
  );
};

const EventThumbnail = ({image, onPress}) => {
  const [loading, isLoading] = useState(true);
  return (
    <TouchableOpacity onPress={onPress}>
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
      <ImageThumbnailContainer>
        <ImageThumbnail
          onLayout={() => isLoading(false)}
          source={{uri: image.url}}
        />
      </ImageThumbnailContainer>
    </TouchableOpacity>
  );
};

export default EventGallery;
