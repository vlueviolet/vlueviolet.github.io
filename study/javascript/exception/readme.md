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

<img width="430" alt="" src="https://user-images.githubusercontent.com/26196090/74635781-0fd30800-51aa-11ea-80ae-241818649909.png">


## promise의 예외처리
비동기적인 코드는 try, catch에서 에러를 잡을 수 없다.
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
<img width="250" alt="" src="https://user-images.githubusercontent.com/26196090/74635972-6b04fa80-51aa-11ea-8311-8bab5cca7162.png">

그래서 promise의 예외처리는 try, catch를 사용하는 것이 아니라,  
promise의 catch를 이용해야 한다.

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

wait(3).catch(e => console.log(e));
```

<img width="440" alt="" src="https://user-images.githubusercontent.com/26196090/74636250-f7172200-51aa-11ea-9d05-1bf195279259.png">

promise의 편리함 중에 하나가 chain 형태로 promise 함수를 넣을 수 있다는 것이다.
```javascript
wait(3)
  .then(_ => console.log('1st then'))
  .then(_ => console.log('2nd then'));
```

<img width="125" alt="스크린샷 2020-02-17 오후 5 39 20" src="https://user-images.githubusercontent.com/26196090/74636991-735e3500-51ac-11ea-87f1-b44a8b193a2d.png">


이런 방식으로 catch를 쓴다면?  
2번째가 실행되지 않고, 1번째만 catch가 실행되는 것을 볼 수 있다.

```javascript
wait(3)
  .catch(e => console.log('1st catch', e))
  .catch(e => console.log('2nd catch', e));
```

<img width="196" alt="" src="https://user-images.githubusercontent.com/26196090/74636768-064a9f80-51ac-11ea-9d26-651967bf5813.png">

### promise의 chain

일반적인 change pattern은 모두 같은 객체를 return한다.
object를 통해 return한 객체와 chain1, chain2를 통해 return한 객체가 모두 같은 객체이다.

```javascript
object().
  .chain1()
  .chain2()
```

하지만, promise의 chain은 첫번째, 두번째 catch의 경우 다른 객체를 리턴한다.

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('error!');
      resolve('success');
    }, sec * 1000);
  });
}

wait(3)
  .catch(e => console.log('1st catch', e)) // 첫번째 catch
  .catch(e => console.log('2nd catch', e));
```
