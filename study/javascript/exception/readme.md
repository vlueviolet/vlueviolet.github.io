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

<img width="269" alt="" src="https://user-images.githubusercontent.com/26196090/74639976-27ae8a00-51b2-11ea-8b52-265b64113a52.png">

## async / await의 예외

async의 동작을 알아보자

```javascript
async function myAsyncFun() {
  return 'done!';
}

const result = myAsyncFun();

console.log(result);
```

<img width="257" alt="" src="https://user-images.githubusercontent.com/26196090/74640298-a4d9ff00-51b2-11ea-9be6-cf319420df24.png">

async의 결과는 promise의 인스턴스가 리턴된다.  
이것은 promise를 생성한 것과 동일한 결과값을 보여준다.  

```javascript
async function myAsyncFun() {
  return 'done!';
}

function myPromiseFunc() {
  return new Promise((resolve, reject) => resolve('done!!'));
}

const result = myAsyncFun();
const result2 = myPromiseFunc();

console.log(result);
console.log(result2);
```

<img width="272" alt="" src="https://user-images.githubusercontent.com/26196090/74640624-35184400-51b3-11ea-816d-731ef9341181.png">


즉, async는 promise의 resolve에 해당한다고 보면 된다.

async에서 reject를 발생하고 싶다면, 일반 함수에서 error을 발생한 것과 같은 throw를 걸어주면 promise에서 reject와 같은 동일한 결과를 얻을 수 있다.

```javascript
async function myAsyncFun() {
  throw 'error!';
}

function myPromiseFunc() {
  return new Promise((resolve, reject) => reject('error!!'));
}

const result = myAsyncFun();
const result2 = myPromiseFunc();

console.log(result);
console.log(result2);
```

<img width="306" alt="" src="https://user-images.githubusercontent.com/26196090/74640894-aeb03200-51b3-11ea-857c-7367cee8beb3.png">

여기서 중요한 것은 promise는 promise를 생성하는 과정에서 reject를 발생시켰다.  
하지만 async함수에서는 동기적으로 실행하는 함수에서 예외를 발생하는 방법과 동일하게, throw를 이용해 reject를 발생시켰다.  

그렇다면, 현재는 Uncaught인 throw를 잡는 방법은 무엇일까?  
promise와 동일하다.  
왜냐하면, 리턴되는 값이 promise와 동일하기 때문이다. 그래서 그걸 잡는 방법도 promise와 동일하다.

```javascript
async function myAsyncFun() {
  throw 'error!';
}

function myPromiseFunc() {
  return new Promise((resolve, reject) => reject('error!!'));
}

const result = myAsyncFun().catch(e => console.error(e));
const result2 = myPromiseFunc().catch(e => console.error(e));
```

<img width="161" alt="" src="https://user-images.githubusercontent.com/26196090/74641470-b4f2de00-51b4-11ea-9593-c93da6b3660c.png">

### await
async에서는 await함수를 쓸 수 있다. await은 async 함수 내부에서만 사용할 수 있다.  

await는 무엇을 하는 녀석인가?  
promise를 기다릴 수 있는 녀석이다.  
즉, promise가 완전히 fullfilled 되거나 또는 rejected 될때까지 기다린다는 의미이다.

아래 구문을 보자.
wait promise 함수를 호출하는 과정을 async가 어떻게 처리하는지 알아보자.

```javascript
function wait(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('wait function');
      resolve('done!!');
    }, sec * 1000);
  });
}

async function myAsyncFun() {
  console.log(new Date());
  wait(3);
  console.log(new Date());
}

const result = myAsyncFun();
```

현재 async 함수는 동기적인 실행이 되고 있어, 첫번째 날짜를 출력하고, wait을 리턴하고 바로 다음 날짜를 출력하고 있다.

<img width="475" alt="스크린샷 2020-02-17 오후 6 52 57" src="https://user-images.githubusercontent.com/26196090/74642685-cccb6180-51b6-11ea-9250-d763e9868335.png">


async의 await을 사용해보자.

```javascript
function wait(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('wait function');
      resolve('done!!');
    }, sec * 1000);
  });
}

async function myAsyncFun() {
  console.log(new Date());
  await wait(3);
  console.log(new Date());
}

const result = myAsyncFun();
```

<img src="https://user-images.githubusercontent.com/26196090/74643656-6cd5ba80-51b8-11ea-9469-5e7dcbb4f4fa.gif">
