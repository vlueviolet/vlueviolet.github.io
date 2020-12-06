// reducer를 결합하는 인덱싱 파일
import { combineReducers } from 'redux'; // reducer를 결합
import count from './count';

const RootReducer = combineReducers({
  count
});

export default RootReducer; // _app.js에서 reducer로 처리
