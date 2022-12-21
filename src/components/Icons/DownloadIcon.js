import React from 'react';
import NegativeDownloadIcon from '../../assets/imgs/negative_download.svg';
import PositiveDownloadIcon from '../../assets/imgs/positive_download.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeDownloadIcon />;

  return <PositiveDownloadIcon />;
};
