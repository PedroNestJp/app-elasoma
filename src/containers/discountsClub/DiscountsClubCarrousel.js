// import React, {useEffect, useRef, useState} from 'react';
// import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import Text from '../../components/Typography/Text';
// import styled from 'styled-components';

// const CarouselContainer = styled(View)`
//   background-color: ${props => props.theme.colors.tertiary};
//   padding-top: 30px;
//   padding-bottom: 30px;
// `;

// export default ({categories, onChange}) => {
//   if (!categories || categories.length <= 0) return null;

//   const carouselRef = useRef(null);
//   const firstItemToShow = Math.floor(categories.length / 2);
//   const [activeSlide, setActiveSlide] = useState(firstItemToShow);

//   useEffect(() => {
//     onChange(categories[firstItemToShow]);
//     console.log('>>> Detalhes das Categorias:', JSON.stringify(categories, null, 2));
//   }, [categories]);

//   const onSnapToItem = index => {
//     setActiveSlide(index);
//     onChange(categories[index]);
//   };

//   const focusItem = (item, index) => {
//     carouselRef.current?.snapToItem(index, true, true);
//     setActiveSlide(index);
//     onChange(categories[index]);
//   };

//   return (
//     <CarouselContainer>
//       <Carousel
//         enableSnap
//         firstItem={firstItemToShow}
//         activeSlideOffset={0}
//         ref={carouselRef}
//         data={categories}
//         layout={'default'}
//         renderItem={({item, index}) => (
//           <TouchableOpacity onPress={() => focusItem(item, index)}>
//             <CategoryIcon category={item} />
//           </TouchableOpacity>
//         )}
//         sliderWidth={Dimensions.get('window').width}
//         itemWidth={150}
//         onSnapToItem={onSnapToItem}
//       />
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'center',
//         }}>
//         <Pagination
//           containerStyle={{
//             bottom: 0,
//             paddingTop: 20,
//             paddingBottom: 0,
//           }}
//           dotColor="#D6BBDB"
//           inactiveDotColor="#999"
//           activeDotIndex={activeSlide}
//           dotsLength={categories.length}
//         />
//       </View>
//     </CarouselContainer>
//   );
// };

// const CategoryIcon = ({category}) => (
//   <View style={{alignItems: 'center'}}>
//     <View>
//       <Image
//         source={{
//           uri: category.icon,
//         }}
//         style={{
//           width: 70,
//           height: 70,
//         }}
//       />
//     </View>
//     <View style={{marginTop: 12}}>
//       <Text size={12}>{category.name}</Text>
//     </View>
//   </View>
// );



import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Text from '../../components/Typography/Text';
import styled from 'styled-components';

const CarouselContainer = styled(View)`
  background-color: ${props => props.theme.colors.tertiary};
  padding-top: 30px;
  padding-bottom: 30px;
`;

const compareCategories = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export default ({categories, onChange}) => {
  if (!categories || categories.length <= 0) return null;

  const carouselRef = useRef(null);
  const firstItemToShow = Math.floor(categories.length / 2);
  const [activeSlide, setActiveSlide] = useState(firstItemToShow);

  useEffect(() => {
    onChange(categories[firstItemToShow]);
    console.log(
      '>>> Detalhes das Categorias:',
      JSON.stringify(categories, null, 2),
    );
  }, [categories]);

  const onSnapToItem = index => {
    setActiveSlide(index);
    onChange(categories[index]);
  };

  const focusItem = (item, index) => {
    carouselRef.current?.snapToItem(index, true, true);
    setActiveSlide(index);
    onChange(categories[index]);
  };

  const sortedCategories = categories.slice().sort(compareCategories);

  return (
    <CarouselContainer>
      <Carousel
        enableSnap
        firstItem={firstItemToShow}
        activeSlideOffset={0}
        ref={carouselRef}
        data={sortedCategories}
        layout={'default'}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => focusItem(item, index)}>
            <CategoryIcon category={item} />
          </TouchableOpacity>
        )}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={150}
        onSnapToItem={onSnapToItem}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Pagination
          containerStyle={{
            bottom: 0,
            paddingTop: 20,
            paddingBottom: 0,
          }}
          dotColor="#D6BBDB"
          inactiveDotColor="#999"
          activeDotIndex={activeSlide}
          dotsLength={sortedCategories.length}
        />
      </View>
    </CarouselContainer>
  );
};

const CategoryIcon = ({ category }) => (
  <View style={{ alignItems: 'center' }}>
    <View>
      <Image
        source={{
          uri: category.icon,
        }}
        style={{
          width: 70,
          height: 70,
        }}
      />
    </View>
    <View style={{ marginTop: 12 }}>
      <Text size={12}>{category.name}</Text>
    </View>
  </View>
);
