import React from 'react';
import NegativeLocker from '../../assets/imgs/negative_locker.svg';
import PositiveLocker from '../../assets/imgs/positive_locker.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <PositiveLocker />;

  return <NegativeLocker />;
};
