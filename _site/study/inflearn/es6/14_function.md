# function

## Arrow function 활용

### 기존 vs arrow 표현
```javascript
// 기존 표현
setTimeout(function () {
    console.log('set time out');
}, 1000);

// array 표현
setTimeout(() => {
    console.log('set time out arrow');
}, 1000);
```
```javascript
// 기존 표현
let array = [1, 2, 3, 4, 5].map(function (value, index, object){
    return value * 2;
});
console.log(array);

// array 표현
let newArray = [1, 2, 3, 4, 5].map((v) => v * 2);        // 바로 return 할때 이렇게 사용
// let newArray = [1, 2, 3, 4, 5].map((v) => (v * 2));   // (v * 2)로 써도 됨, {}를 쓰지 않음
console.log(newArray);
```

<br><br>

## Arrow function 의 this context
### case 1 (setTimeout 예시)
```javascript
// 기존 표현
const myObj = {
    runTimeout() {
        setTimeout(function () {
            console.log(this === window);   // true
            // this가 가리키는 것이 myObj객체가 아닌 window이므로
            this.printData();               // Uncaught TypeError: this.printData is not a function 
        }.bind(this), 200);                 // 해당 함수를 bind로 감싸주면 됨
    },
    printData() {
        console.log('hello world!');
    }
}
myObj.runTimeout();
```
```javascript
// arrow 표현
const myObj = {
    runTimeout() {
        setTimeout(() => {
            console.log(this === window);   // false
            console.log(this)               // 현재 객체를 가리킴
            this.printData();               // hello world!
        }, 200);
    },
    printData() {
        console.log('hello world!');
    }
}
myObj.runTimeout();
```

<br>

### case2 : click 이벤트에 적용되는 arrow 
```javascript
// 기존 표현
const el = document.querySelector('p');
const myObj = {
    register() {
        el.addEventListener('click', function (e) {
            console.log(this);  // <p>my div</p>, p태그를 가리킴
            this.printData();   // Uncaught TypeError: this.printData is not a function
        }.bind(this));  // bind 추가하여 this가 myObj를 가리키도록 함
    },
    printData() {
        console.log('clicked!')
    }
}
myObj.register();
```

```javascript
// arrow 표현
const el = document.querySelector('p');
const myObj = {
    register() {
        el.addEventListener('click', (e) => {
            console.log(this);  // myObj 객체를 가리킴
            this.printData();   // clicked!
        });
    },
    printData() {
        console.log('clicked!')
    }
}
myObj.register();
```

<br><br>

## function default paramaters
파라메터에 default값을 적용할 수 있다.
```javascript
// case1
function cal(value, size = 1) {
    return value * size;
}
console.log(cal(3));            // 3
```
```javascript
// case2 : 객체 타입의 default 파라메터
function cal(value, size={value:1}) {
    return value * size.value;
}
console.log(cal(3, {value:3})); // 9
```

<br><br>

## rest parameters
인자의 개수가 유동적일 때,<br>
함수에 기본 내장되어 있는 *arguments*라는 내장변수를 사용할 수 있다.
*arguments*의 타입은 arguments이기때문에 진짜 배열로 바꿔서 사용하는 등 가공하여 사용할 수도 있다.
```javascript
// 진짜 배열로 바꿔주는 Array의 내장함수 사용
const array = Array.prototype.slice.call(arguments);
```

<br>

### es3 문법을 사용한 가변 인자 처리 방법
함수 구현 예시를 살펴보면,
```javascript
// es3 문법을 사용한 가변 인자 처리 방법
function checkNum() {
    const argArray = Array.prototype.slice.call(arguments); // arguments 내장변수를 진짜 배열로 바꿔줌
    console.log(toString.call(arguments));  // [object Arguments]
    console.log(toString.call(argArray));   // [object Array]

    // every() : 배열을 순회하면서 배열값이 조건에 모두 부함하면 true, 그렇지 않으면 false 반환
    // es3 문법
    return result = argArray.every((v) => typeof v === 'number')
}
console.log(checkNum(10, 2, 3, 4, 5));          // true
console.log(checkNum(10, 2, 3, 4, 5, '55'));    // false
```

<br><br>

### es6의 rest parameter를 사용한 가변 인자 처리 방법
이를 es6 문법에서 제공하는 문법을 살펴보자.<br>
파라메터에 *...parameter*와 같은 형태를 rest parameter라고 하고,<br>
배열로 값을 받아오기때문에 별도의 array로의 변환 과정을 거치지 않아도 된다.<br>
<br>
spread operator와 비슷하나, 파라메터에 들어간 경우는 배열로 받는다 라고 기억하자.

```javascript
// es6의 rest parameter를 사용한 가변 인자 처리 방법
function checkNum(...argArray) { // argArray: rest 파라메터
    console.log(toString.call(argArray));   // [object Array]

    return result = argArray.every((v) => typeof v === 'number')
}
console.log(checkNum(10, 2, 3, 4, 5));          // true
console.log(checkNum(10, 2, 3, 4, 5, '55', false));    // false
```