import React from 'react';
import PositivePencil from '../../assets/imgs/negative_pencil_icon.svg';
import NegativePencil from '../../assets/imgs/positive_pencil_icon.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <PositivePencil />;

  return <NegativePencil />;
};
