import React from 'react';
import PositiveBrand from '../assets/imgs/positive_brand.svg';
import NegativeBrand from '../assets/imgs/negative_brand.svg';
import {useSelector} from 'react-redux';

export default ({container, width, height}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeBrand width={width} height={height} />;

  return <PositiveBrand width={width} height={height} />;
};
