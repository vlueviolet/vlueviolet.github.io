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