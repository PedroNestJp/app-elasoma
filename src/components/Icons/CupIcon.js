import React from 'react';
import NegativeCupIcon from '../../assets/imgs/negative_cup.svg';
import PositiveCupIcon from '../../assets/imgs/positive_cup.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeCupIcon />;

  return <PositiveCupIcon />;
};
