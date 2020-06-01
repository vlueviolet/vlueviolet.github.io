---
layout: post
title: 'Call'
date: 2020-02-23 22:32 GMT+99
author: vlueviolet
categories: javascript
tags: javascript
cover: '/assets/instacode.png'
ref: http://bit.ly/2HKt6Qm 
---


# 함수를 호출하는 방법

보통 함수를 호출하려면 func()와 같이 ()를 붙여 호출한다.  
그 외에도 call, apply를 이용해서 호출 할 수 있는데, 그 방법을 알아보자.

## Call


sayHi 함수를 이용해서 John, Admin이 consoel.log로 찍히게 하려면 어떻게 해야할까?

```javascript
function sayHi() {
  console.log(this.name);
}

let user = { name: 'John' };
let admin = { name: 'Admin' };

user['sayHi'] = sayHi;
admin['sayHi'] = sayHi;

user['sayHi']();
admin['sayHi']();
```

user, admin 객체에 sayHi 함수를 추가하여, 함수 내부에 있는 `this`가 각 객체를 바라보도록 했다.

#### 결과화면
```
John
Admin
```
<br>
<br>

이를 `apply()`를 이용해서 호출해보자.

```javascript
function sayHi() {
  console.log(this.name);
}

let user = { name: 'John' };
let admin = { name: 'Admin' };

sayHi.call(user);
sayHi.call(admin);
```
#### 결과화면
```
John
Admin
```

기본적으로 `this`에 대한 정의가 없다면 `window`를 가리킨다.  
만약, `call()`의 첫번째 파라메터로 객체를 넣어주면, `this`는 해당 객체를 바라보게 되어,  
sayHi 함수에서는 내부적으로 this === user가 되기 때문에,  
this.name을 user.name으로 표현할 수 있게 된다.

```javascript
sayHi.call(user); // this === user
sayHi.call();     //파라메터 없이 전달하면, `this === window`가 된다.
```
<br>
<br>

## arguments

`arguments`는 블록 단위의 scope가 형성될때, 자동으로 설정되는 이름 중 하나이다.  
key, value로 구성된 객체이고, `arguments[0]`을 출력하면 배열로도 출력된다.   
하지만 이는 배열 같아 보이는 유사배열로, `join()` 같은 배열 메소드를 사용할 수 없다.

```javascript
function say(time, phrase) {
  console.log(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: 'John' };
let messageData = ['10:00', 'Hello'];  // become time and phrase

// user becomes this, messageData is passed as a list of arguments (time, phrase)
say.call(user, messageData); // [10:00] John: Hello (this = user)
```

#### 결과화면
```
[10:00,Hello] John: undefined
```

결과에서 알 수 있듯이, messageData가 time에만 들어가는 것을 알 수 있다.  
파라메터를 알아보기 위해 `arguments`를 출력해보자.

```javascript
function say(time, phrase) {
  console.log(arguments);
  console.log(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: 'John' };
let messageData = ['10:00', 'Hello'];  // become time and phrase

// user becomes this, messageData is passed as a list of arguments (time, phrase)
say.call(user, messageData); // [10:00] John: Hello (this = user)
```

#### 결과화면
```
Arguments [Array(2), callee: ƒ, Symbol(Symbol.iterator): ƒ]
> 0: (2) ["10:00", "Hello"]
[10:00,Hello] John: undefined
```

결과화면에서 보듯이, `arguments`는 하나의 `object`로 전달된다.  

정확한 `arguments` 값을 확인하기위해 다음을 출력해보자.

```javascript
function say(time, phrase) {
  console.log(arguments[0]); // time
  console.log(arguments[1]); // phrase
}
```
### 결과화면
```
(2) ["10:00", "Hello"]
undefined
```

`arguments[1]`가 `undefined`가 찍혔다는 것은,  
`say.call(user, messageData);`에서 보낸 첫번째 인자가 `this`를 의미하기 때문이고,  
time = messageData이 됨을 알 수 있다. 

<br>
<br>

time, phrase에 값이 잘 들어가게 하기 위해서는,  
`spread operator`를 사용할 수 있다.

```javascript
function say(time, phrase) {
  console.log(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: 'John' };
let messageData = ['10:00', 'Hello'];  // become time and phrase

// user becomes this, messageData is passed as a list of arguments (time, phrase)
say.call(user, ...messageData); // [10:00] John: Hello (this = user)
```
#### 결과화면
```
[10:00] John: Hello
```

## apply

apply는 this와 aruments로 함수를 호출하는 객체 메소드이다.  
arguments로 넘겨받는 파라메터는 배열(array)뿐 아니라 객체(object)도 구조분해(destructuring) 할 수 있다.  

```javascript
function say(time, phrase) {
  console.log(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: 'John' };
let messageData = ['10:00', 'Hello'];

say.call(user, ...messageData);
say.apply(user, messageData);
```
#### 결과화면
```
[10:00] John: Hello
[10:00] John: Hello
```

### apply가 object를 구조분해 하는 예시

spread operator는 배열(array)만 spread 할 수 있다.  
하지만, apply는 object도 풀어낸다.

```javascript
let worker = {
  slow(min, max) {
    console.log(`Called with ${min}, ${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  console.log('??', func, hash)
  let cache = new Map();

  return function(...rest) {
    // ...rest = arguments
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key); // Again 8 출력 위치
    }
    let result = func.apply(this, arguments); // (**)

    cache.set(key, result);
    return result;
  }
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

console.log(worker.slow(3, 5));
console.log('Again ' + worker.slow(3, 5));
```

#### 결과화면
```
Called with 3, 5
8
Again 8
```

<br>

object를 구조분해하는 것을 apply, call로 정리하면 다음과 같다.

```javascript
let result = func.apply(this, arguments); // OK, object가 들어오는데 apply는 분해 가능
let result = func.call(this, ...arguments); // undefined, call은 object 분해 불가능

let result = func.apply(this, rest); // OK
let result = func.call(this, ...rest); // OK
```

<br>
<br>

## bind

```javascript
let user = {
  firstName: 'Superman',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
}

user.sayHi(); //Hello, Superman!
setTimeout(user.sayHi, 1000); // Hello, undefined!
setTimeout(() => user.sayHi(), 1000); // Hello, Superman!, 인위적으로 sayHi의 주어를 user로 설정함
```

#### 결과화면

```
Hello, Superman!
Hello, undefined!
Hello, Superman!
```

sayHi 함수는 user를 this로 가리켜야 값을 출력하는데,  
setTimeout에서 this는 window를 의미하기 때문에 undefined가 출력된다.

<br><br>

bind가 어떻게 동작하는지 알아보기 위해 다음 예제를 살펴보자.  
user 객체를 정의하여 sayHi 함수를 0.5초뒤에 호출했는데, 곧이어 user 객체에 새로운 값을 정의했다.

과연 어떤 결과가 나올까?

```javascript
let user = {
  firstName: 'Superman',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
}

setTimeout(() => user.sayHi(), 500); // Hello, Superman!, 인위적으로 sayHi의 주어를 user로 설정함

user = {
  firstName: 'Batman',
  sayHi() {
    console.log(`Another name, ${this.firstName}!`);
  }
};
```

#### 결과화면
```
Another name, Batman!
```

0.5초가 지나기 전에 새롭게 user 객체에 할당한 값들이 결국 반영되어 출력된다.  

바뀌지 않은 값을 사용하고 싶은데, 이런 상황이 발생해버렸다.  

이럴 때 사용하는 것이 바로 `bind` 이다.

```javascript
let user = {
  firstName: 'Superman!'
};

function func() {
  console.log(this.firstName);
}

let funcUser = func.bind(user); // func와 user를 묶어줌 
console.log(funcUser); // bound func, bind의 수동형태로 묶여진 함수라는 의미

user = {
  firstName: 'Batman!'
}

console.log(user.firstName); // Batman
funcUser(); // Superman
```

#### 결과화면
```
Superman!
```

다시보자..
https://www.youtube.com/watch?v=TKdGL5elxRc&list=PLlSZlNj22M7SjvFzZcmLH9KURC5LisOTc&index=19