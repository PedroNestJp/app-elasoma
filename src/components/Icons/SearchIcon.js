import React from 'react';
import NegativeSearchIcon from '../../assets/imgs/negative_search_icon.svg';
import PositiveSearchIcon from '../../assets/imgs/positive_search_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeSearchIcon />;

  return <PositiveSearchIcon />;
};
