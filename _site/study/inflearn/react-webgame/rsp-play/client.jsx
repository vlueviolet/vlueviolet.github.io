import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RSP from './RSP-hooks';

ReactDom.render(
  <AppContainer>
    <RSP />
  </AppContainer>,
  document.querySelector('#root')
);