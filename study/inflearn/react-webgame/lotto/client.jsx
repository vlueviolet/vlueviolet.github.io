import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Lotto from './Lotto';

ReactDom.render(
  <AppContainer>
    <Lotto />
  </AppContainer>,
  document.querySelector('#root')
);