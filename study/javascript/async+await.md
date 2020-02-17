# async, await?

- 강사 : 코드종
- URL : [자바스크립트 async / await? 나도 써보자, 기본 개념부터~](https://www.youtube.com/watch?v=JzXjB6L99N4)

## 개념

promise처럼 비동기 방식이지만, 조금 다른 사용법으로 promise를 다룬다.

## 일반 함수 vs async 함수

일반 함수와 async 함수를 출력해보면, async 함수의 경우 promise를 리턴하는 것을 알 수 있다.

```javascript
function myFunc() {
  return 'myFunc';
}

async function myAsync() {
  return 'async';
}

console.log(myFunc());

console.log(myAsync());
```

<img width="296" alt="" src="https://user-images.githubusercontent.com/26196090/74655729-2ee49080-51d0-11ea-9e58-71b31d88fa3c.png">

## async의 리턴값

그렇다면, async 함수는 then을 사용할 수 있다.

```javascript
async function myAsync() {
  return 'async';
}

myAsync().then(data => console.log(data));
```

<img width="114" alt="스크린샷 2020-02-17 오후 9 58 43" src="https://user-images.githubusercontent.com/26196090/74655999-b16d5000-51d0-11ea-945e-da0bc906d367.png">

## await은 어떻게 쓸까?

아래 구문을 실행하면, 동기적인 'async'를 먼저 출력하고 3초후에 promise를 출력하게 된다.
만약, promise가 실행되고 나서 이후 동기코드들을 실행하고 싶다면 어떻게 해야할까?

```javascript
function delayTime(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec * 1000);
  });
}

async function myAsync() {
  delayTime(3).then(d => console.log(d));
  return 'async';
}

myAsync().then(data => console.log(data));
```

<img width="218" alt="" src="https://user-images.githubusercontent.com/26196090/74657041-c0550200-51d2-11ea-83e1-128bc6c96984.png">

`await`는 promise가 resolve되어 결과값이 넘어올때까지 기다린다.
즉, **await이 완료될때까지 다음 줄이 실행되지 않는다.**

```javascript
function delayTime(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec * 1000);
  });
}

async function myAsync() {
  await delayTime(3).then(d => console.log(d));
  // await가 resolve 될때까지 아래 구문이 실행되지 않는다.
  return 'async'; // 여기는 결국 promise의 resolve를 하게 된다.
}

myAsync().then(data => console.log(data));
```

아래와 같이 await를 변수로 받아도 같은 결과를 보여준다.

```javascript
function delayTime(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec * 1000);
  });
}

async function myAsync() {
  const time = await delayTime(3);
  console.log('first: ', time);
  await delayTime(3).then(d => console.log('second: ', d));
  return 'async';
}

myAsync().then(data => console.log(data));
```

<img width="289" alt="" src="https://user-images.githubusercontent.com/26196090/74657838-65240f00-51d4-11ea-8ccd-cfa96a7c0735.png">
