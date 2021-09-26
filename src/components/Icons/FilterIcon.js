import React from 'react';
import NegativeFilterIcon from '../../assets/imgs/positive_filter.svg';
import PositiveFilterIcon from '../../assets/imgs/positive_filter.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeFilterIcon />;

  return <PositiveFilterIcon />;
};
