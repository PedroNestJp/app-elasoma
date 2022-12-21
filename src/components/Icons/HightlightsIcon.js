import React from 'react';
import NegativeHighlightsIcon from '../../assets/imgs/negative_highlights.svg';
import PositiveHighlightsIcon from '../../assets/imgs/positive_highlights.svg';
import {useSelector} from 'react-redux';

export default ({container}) => {
  const {theme} = useSelector(state => state.appConfig);

  if (
    (container === 'light' && theme === 'light') ||
    (!container && theme === 'light')
  )
    return <NegativeHighlightsIcon />;

  return <PositiveHighlightsIcon />;
};
