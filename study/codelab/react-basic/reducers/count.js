export const initialState = 0; // state 값은 객체, 배열 구조 가능 (useReducer 구조 참조)

// Action 타입 설정
export const COUNT_PLUS = 'COUNT_PLUS';
export const COUNT_MINUS = 'COUNT_MINUS';

// Action 생성 함수, 보통 low camelcase를 사용함
export const countPlusAction = () => ({
  type: COUNT_PLUS
});

export const countMinusAction = () => ({
  type: COUNT_MINUS
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_PLUS:
      return state + 1;
    case COUNT_MINUS:
      return state - 1;
    default:
      // reducer가 불변성을 유지하기 위해 반드시 필요함
      return state;
  }
};

export default reducer;
