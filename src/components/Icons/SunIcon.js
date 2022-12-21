import React from 'react';
import PositiveSunIcon from '../../assets/imgs/positive_sun_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return null;

  return <PositiveSunIcon />;
};
