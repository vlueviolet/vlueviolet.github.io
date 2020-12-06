import withRedux from 'next-redux-wrapper';
// import { Provider } from 'react-redux'; // nextjs에서는 사용하지 않고, withRedux를 사용
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import '../styles/styles.scss';
import { initialState } from '../reducers/count';
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

const configureStore = (initialState, options) => {
  const middlewares = []; // 미들웨어 react-thunk나 react-saga 등
  // Componse를 통해 미들웨어 결합
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer); // store 생성
  return store;
};

// export default MyApp;
export default withRedux(configureStore)(MyApp); // withRedux를 통해 MyApp에 configureStore를 props 형태로 전달함
