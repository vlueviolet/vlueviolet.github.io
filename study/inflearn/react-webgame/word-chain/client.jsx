const React = require('react');
const ReactDom = require('react-dom');
const { AppContainer } = require('react-hot-loader');
// const { hot } = require('react-hot-loader/root');

// const WordRelay = require('./WordRelay');
const WordRelay = require('./WordRelay-hooks');

// const Hot = hot(WordRelay);

// ReactDom.render(<Hot />, document.querySelector('#root'));
ReactDom.render(
  <AppContainer>
    <WordRelay />
  </AppContainer>,
  document.querySelector('#root'));