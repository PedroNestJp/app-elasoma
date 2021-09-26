import React from 'react';
import PositiveCloseIcon from '../../assets/imgs/positive_close_icon.svg';
import NegativeCloseIcon from '../../assets/imgs/negative_close_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeCloseIcon />;

  return <PositiveCloseIcon />;
};
