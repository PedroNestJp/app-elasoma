import React from 'react';
import PositiveMenuIcon from '../../assets/imgs/positive_menu.svg';
import NegativeMenuIcon from '../../assets/imgs/negative_menu.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeMenuIcon />;

  return <PositiveMenuIcon />;
};
