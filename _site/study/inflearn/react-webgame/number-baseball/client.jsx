import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import NumberBaseball from './NumberBaseball';
// import NumberBaseball from './NumberBaseball-hooks';
// import TestRender from './TestRender';

ReactDom.render(
  <AppContainer>
    <NumberBaseball />
  </AppContainer>,
  document.querySelector('#root')
);