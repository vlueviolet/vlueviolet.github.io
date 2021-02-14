import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countPlusAction, countMinusAction } from '../reducers/count'; // 액션 생성 함수

const CountPage = () => {
  const dispatch = useDispatch(); // dispatch를 사용하는 hook
  const count = useSelector((state) => state.count); // store의 state 호출, store의 상태값을 가져올때 useSelector라는 redux의 내장 함수를 사용한다. 여기에는 state.count값을 가져온 상태이다.

  const handleClickPlus = useCallback(() => {
    dispatch(countPlusAction()); // 액션 생성 함수를 호출해서 dispatch 해준다.
  }, []);

  const handleClickMinus = useCallback(() => {
    dispatch(countMinusAction());
  }, []);

  return (
    <div>
      카운트 : {count}
      <button type="button" onClick={handleClickPlus}>
        +
      </button>
      <button type="button" onClick={handleClickMinus}>
        -
      </button>
    </div>
  );
};

export default CountPage;
