import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import ResponseCheck from './ResponseCheck';
import ResponseCheck from './ResponseCheck-hooks';

ReactDom.render(
  <AppContainer>
    <ResponseCheck />
  </AppContainer>,
  document.querySelector('#root')
);