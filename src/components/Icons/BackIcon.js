import React from 'react';
import NegativeBackIcon from '../../assets/imgs/negative_back_icon.svg';
import PositiveBackIcon from '../../assets/imgs/positive_back_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeBackIcon />;

  return <PositiveBackIcon />;
};
