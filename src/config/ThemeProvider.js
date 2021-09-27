import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {themes} from '../contants/themes';

const Theme = ({children}) => {
  const {theme} = useSelector(state => state.appConfig);

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default Theme;
