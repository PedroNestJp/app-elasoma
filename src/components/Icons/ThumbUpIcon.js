import React from 'react';
import PositiveThumbUp from '../../assets/imgs/negative_thumb_up.svg';
import NegativeThumbUp from '../../assets/imgs/positive_thumb_up.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <PositiveThumbUp />;

  return <NegativeThumbUp />;
};
