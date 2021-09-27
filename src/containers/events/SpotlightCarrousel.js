import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import EventHeader from './EventHeader';
import {Screens} from '../../contants/screens';

export default ({spotlights, navigation}) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(
    Math.floor(spotlights.length / 2),
  );

  const goToEventDetail = event => {
    navigation.push(Screens.EVENTS.navigator, {
      screen: Screens.EVENTS.EVENT_DETAILS_SCREEN,
      params: {id: event.id},
    });
  };

  return (
    <View>
      <Carousel
        firstItem={Math.floor(spotlights.length / 2)}
        activeSlideOffset={0}
        ref={carouselRef}
        data={spotlights}
        layout={'default'}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => goToEventDetail(item)}>
            <EventHeader showDate event={item} />
          </TouchableOpacity>
        )}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Pagination
          containerStyle={{
            bottom: 0,
            paddingVertical: 15,
            position: 'absolute',
          }}
          dotColor="#0F4DFF"
          inactiveDotColor="#fff"
          activeDotIndex={activeSlide}
          dotsLength={spotlights.length}
        />
      </View>
    </View>
  );
};
