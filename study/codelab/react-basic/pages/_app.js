import withRedux from 'next-redux-wrapper';
// import { Provider } from 'react-redux'; // nextjs에서는 사용하지 않고, withRedux를 사용

// redux
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from '../reducers/count';

// redux saga
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import rootSaga from '../sagas';

import '../styles/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    /** react-redux의 Provider로 Component 감싸기
     * redux store 사용 가능
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      * redux store 사용 가능
     */
    <Component {...pageProps} />
  );
}

// ssr 관련 코드
// MyApp.getInitialProps = async (context) => {
//   const { ctx, Component } = context;
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   return { pageProps };
// };

// redux
// const configureStore = (initialState, options) => {
//   const middlewares = []; // 미들웨어 react-thunk나 react-saga 등
//   // Componse를 통해 미들웨어 결합
//   const enhancer =
//     process.env.NODE_ENV === 'production'
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(reducer, initialState, enhancer); // store 생성
//   return store;
// };

// redux saga
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware(); // redux-saga 생성
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer); // saga
  store.sagaTask = sagaMiddleware.run(rootSaga); // store에 rootSaga를
  return store;
};

// export default MyApp;

// storesms withRedux를 통해 props로 주입
// export default withRedux(configureStore)(MyApp); // withRedux를 통해 MyApp에 configureStore를 props 형태로 전달함

// redux와 saga 동시 적용
export default withRedux(configureStore)(withReduxSaga(MyApp));
