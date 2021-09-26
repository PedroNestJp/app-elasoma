import React from 'react';
import NegativeMoonIcon from '../../assets/imgs/negative_moon_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeMoonIcon />;

  return null;
};
