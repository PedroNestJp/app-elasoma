import React from 'react';
import PositiveShare from '../../assets/imgs/negative_share.svg';
import NegativeShare from '../../assets/imgs/positive_share.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <PositiveShare />;

  return <NegativeShare />;
};
