import React, {useEffect, useState} from 'react';
import {Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

const lightStyle =
  'style=element:geometry.stroke%7Cvisibility:off&style=feature:administrative%7Celement:labels.icon%7Cvisibility:off&style=feature:administrative%7Celement:labels.text%7Cvisibility:off&style=feature:landscape%7Celement:labels.icon%7Cvisibility:off&style=feature:landscape%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.icon%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.local%7Celement:labels.text%7Cvisibility:off&style=feature:transit%7Cvisibility:off';

const darkStyle =
  'style=element:geometry%7Ccolor:0x212121&style=element:geometry.stroke%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative%7Celement:labels.icon%7Cvisibility:off&style=feature:administrative%7Celement:labels.text%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:landscape%7Celement:labels.icon%7Cvisibility:off&style=feature:landscape%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.icon%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d';

export default ({
  width = Dimensions.get('window').width,
  height,
  mapCoordinates,
  maptype = 'roadmap',
}) => {
  const {theme} = useSelector(state => state.appConfig);
  const [innerWidth, setInnerWidth] = useState(width);

  const style = theme === 'light' ? lightStyle : darkStyle;

  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) =>
      setInnerWidth(window.width),
    );

    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  const uri = `https://maps.googleapis.com/maps/api/staticmap?center=${
    mapCoordinates?.lat
  },${mapCoordinates?.lng}&zoom=15&size=${Math.floor(innerWidth)}x${Math.floor(
    height,
  )}&maptype=${maptype}&markers=color:red%7C${mapCoordinates?.lat},${
    mapCoordinates?.lng
  }&key=AIzaSyBeKx4waOwEwyojvv-kLYcTiFtZX06njcU&${style}`;

  return <Image source={{uri}} style={{width, height}} />;
};
