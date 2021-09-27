import React from 'react';
import NegativePlayIcon from '../../assets/imgs/negative_play.svg';
import PositivePlayIcon from '../../assets/imgs/positive_play.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativePlayIcon />;

  return <PositivePlayIcon />;
};
