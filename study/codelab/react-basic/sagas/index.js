// all : 여러개의 saga를 묶어줌
// call : saga에 파라메터를 전달해 호출함
// put : dispatch와 같은 동작
// takeLatest : 한번에 많은 request가 들어오면 마지막 요청일때만 함수를 실행
// fork : 비동기 처리를 할 때 사용
import { all, call } from 'redux-saga/effects';
import saga from './saga';

/** 제너레이터 함수
 * function 뒤에 *를 붙여주면 제너레이터 함수로 인식이 된다.
 * call에 대한 반복적인 요청을 할 것이고, 설정하는 이벤트에 대한 특정한 상황, 모니터링에 따라 원하는 값을 노출해야하기 때문에 제너레이터 함수를 써서 call을 하게 된다.
 */
export default function* rootSaga() {
  yield all([call(saga)]);
}
