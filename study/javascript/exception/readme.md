# 자바스크립트 예외처리

## try, catch를 이용한 예외처리

일반적인 동기적인 코드의 경우, try, catch를 이용해 에러상황을 처리할 수 있다.

```javascript
function f2() {
  console.log('f2 start');
  throw new Error('에러'); // 해당하는 콜스택 정보가 담김
  console.log('f2 end');
}

function f1() {
  console.log('f1 start');
  f2();
  try {
    f2();
  } catch (e) {
    // try에서 발생한 에러를 처리함
    console.error(e);
  }
  console.log('f1 end');
}

console.log('will : f1');
f1();
console.log('did : f1');
```

promise의 예외처리는 try

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

```
Uncaught (in promise) error!
```
