import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Text from '../../components/Typography/Text'; // Presumindo que você tenha esse componente

const compareCategories = (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase());

const CategoryCarousel = ({ categories, onChange }) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(Math.floor(categories.length / 2));

  const sortedCategories = useMemo(() => categories.slice().sort(compareCategories), [categories]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      onChange(sortedCategories[activeSlide]);
    }
  }, [categories, activeSlide, onChange, sortedCategories]);

  const onSnapToItem = useCallback(index => {
    setActiveSlide(index);
    onChange(sortedCategories[index]);
  }, [onChange, sortedCategories]);

  const focusItem = useCallback((_, index) => {
    carouselRef.current?.snapToItem(index, true, true);
    setActiveSlide(index);
    onChange(sortedCategories[index]);
  }, [onChange, sortedCategories]);

  if (!categories || categories.length === 0) return null;

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={sortedCategories}
        firstItem={activeSlide}
        layout="default"
        sliderWidth={Dimensions.get('window').width}
        itemWidth={150}
        onSnapToItem={onSnapToItem}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => focusItem(item, index)}>
            <CategoryIcon category={item} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.carouselWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotColor="#D6BBDB"
          inactiveDotColor="#999"
          activeDotIndex={activeSlide}
          dotsLength={sortedCategories.length}
        />
      </View>
    </View>
  );
};

const CategoryIcon = ({ category }) => (
  <View style={styles.categoryIconContainer}>
    <Image style={styles.categoryIconImage} source={{ uri: category.icon }} />
    <Text style={styles.categoryName}>{category.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 30,
  },
  carouselWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationContainer: {
    bottom: 0,
    paddingTop: 20,
  },
  categoryIconContainer: {
    alignItems: 'center',
  },
  categoryIconImage: {
    width: 70,
    height: 70,
  },
  categoryName: {
    marginTop: 12,
    fontSize: 12,
  },
});

export default CategoryCarousel;
