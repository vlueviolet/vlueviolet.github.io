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

promise의 편리함 중에 하나가 chain 형태로 promise 함수를 넣을 수 있다는 것인데,  
catch를 연속 chanin으로 하면 어떨까?

```javascript
wait(3)
  .catch(e => console.log('1st catch', e))
  .catch(e => console.log('2nd catch', e));
```

2번째가 실행되지 않고, 1번째만 catch가 실행되는 것을 볼 수 있다.

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
(then도 마찬가지이다.)

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

wait(3)
  .catch(e => console.log('1st catch', e))
  .catch(e => console.log('2nd catch', e));
```

wait(3)를 실행했을때 리턴된 promise는 promise의 executor-즉 wait함수의 Promise의 resolve, reject 실행과 관련된 - 실행상태를 나타내는 promise이다.  
이 promise에서 예외가 발생했을때 첫번째 catch를 실행시키게 된다.

첫번째 catch를 실행하고 리턴된 promise는 wait(3)과는 전혀 상관이 없고,  
첫번째 catch 자체 행동이 제대로 되었는지에 대한 promise이다.

즉, 두번째 catch는 첫번째 catch가 정상적으로 실행되었는지를 나타내는 promise에 걸어둔 catch이다.

실행을 정리하면 다음과 같다.

1. wait(3)을 실행하여 첫번째 catch가 실행하였고
2. 첫번째 catch가 잘 실행하였기 때문에 두번째 catch가 실행하지 않았던 것이다.

여기서 두번째 chain을 실행하고 싶다면, throw를 던지는 것이다.

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

wait(3)
  .catch(e => {
    console.log('1st catch', e);
    throw e;
  })
  .catch(e => console.log('2nd catch', e));
```

### then을 활용한 catch

then 구문에는 2가지 파라미터를 보낼 수 있다.

- onfullfilled : then에서 성공했을때 실행하는 함수
- onrejected : then에서 실패했을때 실행하는 함수

<img src="https://user-images.githubusercontent.com/26196090/74639147-b6220c00-51b0-11ea-827c-67de30e8a2b2.png">

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

wait(3)
  .then(
    () => {
      console.log('done!!!');
    },
    e => {
      console.log('1st catch in Then', e);
    }
  )
  .catch(e => console.log('2nd catch', e));
```

<img width="226" alt="" src="https://user-images.githubusercontent.com/26196090/74639619-8e7f7380-51b1-11ea-8204-e8ac7ced83f3.png">

then에 의해 작성된 cath가 실행되는 것을 볼 수 있다.  
여기서도 두번째 catch는 실행되지 않았다. 즉, then에게 주어진 일이 정상적으로 실행되지 않았을때 발생하기 때문이다.

두번째 catch가 실행하도록 상황을 가정한다면, 다음과 같이 할 수 있다.

```javascript
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error!');
    }, sec * 1000);
  });
}

wait(3)
  .then(
    () => {
      console.log('done!!!');
    },
    e => {
      console.log('1st catch in Then', e);
      throw new Error('throw in Then');
    }
  )
  .catch(e => console.log('2nd catch', e));
```

<img width="269" alt="스크린샷 2020-02-17 오후 6 19 53" src="https://user-images.githubusercontent.com/26196090/74639976-27ae8a00-51b2-11ea-8b52-265b64113a52.png">
