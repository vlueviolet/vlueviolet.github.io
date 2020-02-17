# 자바스크립트 예외처리

## try, catch를 이용한 예외처리

일반적인 동기적인 코드의 경우, `try`, `catch`를 이용해 에러상황을 처리할 수 있다.

```javascript
function f2() {
  console.log('f2 start');
  throw new Error('에러'); // 해당하는 콜스택 정보가 담김
  console.log('f2 end');
}

function f1() {
  console.log('f1 start');
  try {
    f2();
  } catch (e) { // try에서 발생한 에러를 처리함
    console.error(e);
  }
  console.log('f1 end');
}

console.log('will : f1');
f1();
console.log('did : f1');
```

결과 화면같이, error를 catch하는 것을 볼 수 있다.

<img width="430" alt="스크린샷 2020-02-17 오후 5 21 58" src="https://user-images.githubusercontent.com/26196090/74635781-0fd30800-51aa-11ea-80ae-241818649909.png">


## promise의 예외처리
try, catch는 비동기처리인 promise에서 에러를 처리할 수 없다.
아래 코드와 같이 try 구문에서 에러를 처리하면, `Uncaught`를 확인할 수 있다.

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

try {
  wait(3);
} catch (e) {
  console.error(e);
}
```
<img width="250" alt="스크린샷 2020-02-17 오후 5 10 53" src="https://user-images.githubusercontent.com/26196090/74635972-6b04fa80-51aa-11ea-8311-8bab5cca7162.png">

