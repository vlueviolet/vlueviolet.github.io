# Reduce()

참고 강의 http://bit.ly/2NBMaGi<br>
<br>
reduce는 배열을 순회하면서 인덱스 데이터를 줄여가며 어떠한 기능을 수행 할 수 있다.<br>
<br>
reduce의 인자는 '배열, 함수, 시작값'이 주어져야 한다.<br>
두번째 인자인 함수를 재귀적으로 계속 호출하면서 값을 축약해 나가는 함수이다.
array를 func에 넣어서 결과값을 만들기 위해 사용하는 함수이다.<br>
원래 들어온 자료를 축약된 새로운 자료로 만들기 위해 사용한다.<br>

<br>

```javascript
reduce(array, func, initial);
```

<br>

filter, map은 배열(array)로 들어온 자료를 배열(array)로 리턴하기 위해 사용한다면,<br>
reduce는 배열(array)로 들어온 자료에서 어떤 숫자를 추출하거나, 객체를 만든다거나 할때 사용한다.<br>
<br>
reduce는 이렇게 동작된다.<br>

```javascript
const array = [1, 2, 3];

function add(a, b) {
    return a + b;
}

function _reduce(list, func, memo) {
    for(let i = 0 ; i < list.length ; i++) {
        memo = func(memo, list[i]);
        console.log(i, memo)
    }
    return memo;
}

console.log('result', _reduce(array, add, 0));  // 6
```

복잡하고 어려운 로직을 단순하게 만들어 준다.<br>
축약해가는 과정이 숨겨져서 보여지지 않게 만들어져있다.<br>
<br>
3번째 인자값을 변경할 수 있다.<br>

```javascript
console.log('result', _reduce(array, add, 10));  // 16
```

3번째 인자는 생략이 가능하다. 인자가 생략되었을때 기존의 memo에 1이 들어가기때문에<br>
배열의 길이도 1이 빠진만큼 줄어들어야 한다. 이를 구현해보면,<br>

```javascript
const slice = Array.prototype.slice;    // Array객체에 있는 함수 활용

function _rest(list, num) {
    return slice.call(list, num || 1);  // call을 사용하여 기본 Array 객체의 함수를 실행
}

const array = [1, 2, 3];

function add(a, b) {
    return a + b;
}

function _reduce(list, func, memo) {
    if (arguments.length === 2) {
        memo = list[0];
        list = _rest(list);
    }
    for(let i = 0 ; i < list.length ; i++) {
        memo = func(memo, list[i]);
        console.log(i, memo)
    }
    return memo;
}

console.log('result', _reduce(array, add));  // 6

```


```javascript
// reduce(배열, 콜백함수, 시작값);
function _reduce() {}

const result = _reduce([1, 2, 3], function (a, b) {
    return a + b;
}, 0);
console.log(result);    // 6이 출력되어야 함
```

다른 예제<br>
1~10까지 더하는 예제이다.<br>
참고링크 https://2dubbing.tistory.com/55<br>
<br>
reduce는 callback 함수, 초기값을 인자로 전달한다.<br>
callback 함수에는 4개의 인자가 있다.
- initialValue : reduce함수의 2번째 인자인 initValue값
- currentValue : numberList[0] 값
- currentIndex : reduce함수의 2번째 인자의 사용여부에 따라 달라짐, 사용했다면 0, 사용안했다면 1번째 index부터 시작한다.
- array : reduce() 함수가 호출 된 배열, 즉 numberList를 의미한다.
<br>

```javascript
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 
const initValue = 0;

// initValue 생략 가능
const totalResult = numberList.reduce((initialValue, currentValue, currentIndex, array) => {
    return initialValue + currentValue;
}, initValue);

console.log(totalResult);   // 55

/**
 * 
1 = numberList[0] + 1
3 = numberList[1] + numberList[0] + 1
6 = numberList[2] + numberList[1] + numberList[0] + 1
10 = numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
15 = numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
21 = numberList[5] + numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
28 = numberList[6] + numberList[5] + numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
36 = numberList[7] + numberList[6] + numberList[5] + numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
45 = numberList[8] + numberList[7] + numberList[6] + numberList[5] + numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
55 = numberList[9] + numberList[8] + numberList[7] + numberList[6] + numberList[5] + numberList[4] + numberList[3] + numberList[2] + numberList[1] + numberList[0] + 1
 */

// 출처: https://2dubbing.tistory.com/55 [비실이의 개발공간]
```

```javascript
const fruit = ['apple', 'grape', 'banana', 'apple', 'orange', 'grape', 'apple', 'orange'];
 
const result = fruit.reduce((object, currentValue, index) => {
    if (!object[currentValue]) {
        object[currentValue] = 0;
    }
    // console.log(object, currentValue, index)
    object[currentValue]++;
    // console.log(object)
    return object;
}, {});
 
console.log(result);  // {apple: 3, grape: 2, banana: 1, orange: 2}

//출처: https://2dubbing.tistory.com/55 [비실이의 개발공간]
```