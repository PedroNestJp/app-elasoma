import React from 'react';
import PositiveReply from '../../assets/imgs/negative_reply.svg';
import NegativeReply from '../../assets/imgs/positive_reply.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeReply />;

  return <PositiveReply />;
};
