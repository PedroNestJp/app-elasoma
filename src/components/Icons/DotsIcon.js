import React from 'react';
import NegativeArrowIcon from '../../assets/imgs/negative_dots_icon.svg';
import PositiveArrowIcon from '../../assets/imgs/positive_dots_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeArrowIcon />;

  return <PositiveArrowIcon />;
};
