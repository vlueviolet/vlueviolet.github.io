# JavaScript 객체 지향 프로그래밍

## 객체란
서로 연관된 변수와 함수를 그룹핑하고 이름을 붙인 것
이름이 있는 정보를 정리정돈하는 도구 역할
객체는 . 또는 []를 통해 정보를 읽어온다.

```javascript
const memberObj = {
    manager: 'aaa',
    developer: 'bbb',
    designer: 'ccc'
}
// 객체읽기
console.log(obj.manager);
console.log(obj['manager]);
// 객체 삭제
delete obj.manager;
// 객체 변경
obj.designer = 'ddd';
```

## this
자신이 속한 객체를 가리키는 키워드

## constructor
함수에 new를 붙이면 객체를 생성하는 생성자가 됨
constructor는 객체를 만들고 (new), 초기 상태를 셋팅한다.


```javascript
function Person() {}

console.log(Person());  // 함수
console.log(new Person());  // 생성자
```

## prototype
javascript를 prototype based language라고도 함

### prototype이 필요한 이유?
생성자 함수를 통해 만드는 메소드, 속성을 공통으로 구현하기 위해 prototype을 사용한다.

sum()가 생성자 함수를 정의할때 쓰여져 있어, new로 생성자함수 생성할때마다 함수도 같이 매번 정의된다.
개수가 많아지면, 메모리에 부담을 줄 수 있다.
만약, 수정이 필요하다면 모든 객체들이 각가의 변수와 함수를 갖고 있기때문에 개별적으로 일일히 수정해줘야 하는 번거로움이 있다.
```javascript
function Persion(name, first, second) {
    this.name = name;
    this.first = first;
    this.secont = second;
    this.sum = function () {
        return this.first + this.second;
    }
}
// 이런식으로 생성자 함수를 생성하면 생성한 만큼 변수와 함수가 만들어져, 개수가 많아지면 메모리에 부담을 줄 수 있다.
const kim = new Person();
const lee = new Person();
```

이를 prototype으로 함수 원형을 생성자 함수 밖에서 정의한다면,
생성자 함수 안에 sum()을 정의하는 부분이 들어가있지 않기 때문에 정의하는 코드는 객체를 정의할때마다 실행되지 않고, 1번만 실행된다. 성능과 메모리를 절약할 수 있다.

```javascript
function Persion(name, first, second) {
    this.name = name;
    this.first = first;
    this.secont = second;
}
// Person 생성자로 생성된 객체들은 모두 prototype으로 선언된 영역에 접근 가능
Person.prototype.sum = function () {
    return this.first + this.second;
}
const kim = new Person(10, 20);
/**
 * javascript는 kim.sum을 호출할때 객체 자신이 sum이라는 속성을 갖고 있는지 찾는다.
 * 여기서 sum 속성은 함수이다.
 * 속성인 함수가 아래 정의되어 있기 때문에 이 함수를 실행하고 종료한다.
*/ 
// kim 객체의 sum함수만 다르게 수정되었다. lee에는 영향이 가지 않는다.
kim.sum = function () {
    return 'this' + (this.first + this.second);
}
/**
 * lee 객체를 생성한 이후에 sum을 정의한 적이 없기때문에 javascript는 생성자 함수에 정의되어있는 sum함수를 찾는다.
 * 찾아지면 그 함수를 실행한다.
 */
const lee = new Person(50, 50);
console.log('kim.sum: ', kim.sum());    // this 30
console.log('lee.sum: ', lee.sum());    // 100
```

## class
생성자 함수의 대체제
ES6에 추가된 기능
class에서는 function 키워드를 쓰지 않는다.

```javascript
class Person {
    // 변수 생성을 위한 예약어 함수
    // class를 통해 객체가 실행되는 과정에서 자동으로 호출됨
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    // 함수 생성
    sum() {}
}

let kim = new Person(10, 20);
console.log(kim);   // Person { first: 10, second: 20 }
```

### class에서 객체의 method 구현

```javascript
class Person {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    // 함수 생성, function 키워드를 사용하지 않음
    sum() {
        return this.first + this.second;
    }
}

let kim = new Person(10, 20);
console.log(kim.sum()); // 30
// method 수정 가능
kim.sum = function() {
    return 'modify' + (this.first + this.second);
}
console.log(kim.sum()); // modify 30
```

### class 상속
다른 개발자들과 공통으로 사용하는 class 또는 라이브러리를 통한 class를 사용할때, 원하는 기능이 없거나 해당 class에 함수를 추가, 수정이 용이하지 않을때 상속 기능을 사용할 수 있다.
중복된 코드를 제거할 수 있기때문에 유지보수에 용이하다.

```javascript
class Person{
    constructor() {}
    sum() {}
}
// 추가하려는 자식 class 뒤로 extends 부모 class가 옴
class PersonPlus extends Person {
    // Person과 중복된 코드는 제거
    avg() {

    }
}

const p = new PersonPlus(10, 20);
console.log(kim.sum());
console.log(kim.avg());
```

```javascript
class Person {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    // 함수 생성
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor() {
        // console.log('/////')
    }
    avg() {
        return (this.first + this.second)/2;
    }
}

let kim = new PersonPlus(10, 20);
console.log(kim.sum()); // 30
console.log(kim.avg()); // 15
```


### super
부모클래스에서 하지못하는 일을 자식클래스에서 처리해야할 때 사용하는 키워드
자식 constructor가 실행될때 부모 constructor를 먼저 실행하게 해줌
부모와 나와 중복으로 갖고있는 내용 제거 가능

```javascript
class Person {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    // 함수 생성
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor(first, second, third) {
        super(first, second); // 부모 클래스의 constructor를 호출하여 속성 정의됨
        this.third = third;
    }
    sum() {
        // 부모 클래스의 함수 실행가능
        return super.sum() + this.third;
    }
    avg() {
        return (this.first + this.second)/2;
    }
}

let kim = new PersonPlus(10, 20, 30);
console.log(kim.sum()); // 30
console.log(kim.avg()); // 15
```

## 객체 상속의 사용
javascript는 class의 상속이 아닌 객체의 상속을 지원한다.
이는 주류 객체지향 언어에서 특이한 접근이다.
실행되는 런타임하는 동안 __proto__, Object.create()를 통해 다른 객체로 바꿀 수 있다. 굉장히 유연하면서도 기괴하다....

### __proto__ 를 이용한 객체간의 상속
javascript에서의 class는 문법의 표현일뿐, 다른 언어의 class와는 다르다.
sub 객체와 super 객체가 있다고 가정해보자.
sub 객체가 super 객체의 기능을 상속받으면서 기능을 추가하고 싶을때,
sub 객체가 super 객체로부터 직접 기능을 상속받을 수 있다.

[](./images/1.png)

전통적인 주류 객체지향언어에서는 클래스가 상속을 받는데,
javascript에서는 객체가 직접 다른 객체의 상속을 받을 수 있고, 이 상속 관계를 얼마든지 바꿀 수 있다.
다른 객체로부터 상속을 바꾸고 싶다면 링크만 바꾸면 되고, 이를 prototype link 라고 한다.
이 맥락에서 sub 객체의 prototype link가 가르키는 객체를 prototype object라고도 한다.
javascript의 class 상속이 아니라 전통적인 상속을 알아보자.

예시1)
```javascript
const superObj = {
    superVal: 'super'
}
const subObj = {
    subVal: 'sub'
}
// prototype link를 통해서 subObj가 superObj의 자식이됨
subObj.__proto__ = superObj;
console.log(subObj.subVal);     // sub
// javascript는 제일 먼저 superObj에서 __proto__로 인해 superVal이 있는지 체크한다.
// 있다면 그걸 먼저 쓴다.
console.log(subObj.superVal);   // super

subObj.superObj = 'sub';
console.log(subObj.superVal);   // super, 상속 원형은 안바뀜 
```

예시 2)
```javascript
const kim = {
    name: 'kinm',
    first: 10,
    second: 20,
    sum: function () {
        return this.first + this.second;
    }
} 

const lee = {
    name: 'lee',
    first: 1,
    second: 2,
    /** avg
     * lee에서만 구현하고 싶은 함수가 있다면, 추가 가능
     * kim이 갖지않은 자기만의 기능을 갖게됨
     */
    avg: function() {
        return (this.first + this.second)/2;
    }
}

// lee의 __proto__에 kim을 상속 받음, 즉 lee는 kim의 자식
lee.__proto__ = kim;

/* lee.sum() 구문
kim을 상속받았기 때문에 lee에 없는 sum()가 실행됨
javascript는 lee.sum() 구문으로 lee 객체에 sum이 있는지를 찾는다.
하지만 없다. 그렇다면 javascript는 lee 객체의 __proto__의 메소드가 있는지 찾는다.
있기때문에 실행된다.
kim의 sum()의 this가 가리키는 것은 lee 객체이다. 
*/
console.log(lee.sum()); // 3
console.log(lee.avg()); // 1.5
```

정리하자면, __proto__ 값을 바꿔주면 해당 객체는 다른 객체의 자식이 된다.
굉장히 유연한 특징이지만, 유연하기때문에 복잡하고 사고가 날 가능성이 있다.
javascript 표준에서는 __proto__를 표준으로 인정하고 있지 않다.
하지만 구현상에서는 제공하고 있어, 사실상 표준의 생태라고 보면 된다.
이렇게 상속을 받는것은 정석은 아니기때문에 다른 방법으로 상속을 구현하자.

### Object.create() 를 이용한 객체간의 상속
__proto__의 대체제로, javascript에서 권장하는 표준방법이다.
초기부터 있었던 객체가 아니기때문에 하위 브라우저에서 지원 안될 수도 있다.
polyfill 같은걸 적용하면 가능

예시1)
```javascript
// __proto__로 객체 상속
subObj.__proto__ = superObj;
console.log(subObj.subVal);     // sub

// Object.create()를 이용한 객체 상속
const subObj = Object.create(superObj);
subObj.subVal = 'sub';
console.log(subObj.subVal);   // sub
```

예시2)
```javascript
const kim = {
    name: 'kinm',
    first: 10,
    second: 20,
    sum: function () {
        return this.first + this.second;
    }
}
// kim을 prototype object로 하는 객체를 만들어라.
const lee =  Object.create(kim);
lee.name = 'lee';
lee.first = 2;
lee.second = 1;
lee.avg = function () {
    return (this.first + this.second)/2;
}

console.log(lee.sum()); // 3
console.log(lee.avg()); // 1.5
```

## 객체와 함수
자바스크립트는에서 함수는
혼자 있으면 개인이고, 어떤 객체안에 종속되는 메소드가 되기도 하고, 
new가 앞에 있으면 객체를 만드는 신이고,
call을 뒤에 붙이면 용병이고, bind를 붙이면 분신술을 부리는 놀라운 존재입니다.

### call
javascript의 모든 함수가 갖는 메소드이다.
call을 호출하여 실행할 때마다 어떤 객체의 this를 바꾸는 즉 context를 바꾸는 메소드이다.

호출하려는 함수를 실행하려는 것 같은 동작을 하며, 파라메터를 갖는다.
- 첫번째 인자는 호출하려는 함수의 this를 지정할 객체가 들어가고,
- 두번째 인자부터는 호출하려는 함수의 파라메터가 들어간다.
- 예제를 참고하다.

유사품에는 apply()가 있다.

```javascript
const kim = {
    name: 'kim',
    first: 10,
    second: 20,
}
const lee = {
    name: 'lee',
    first: 2,
    second: 1
}
function sum() {
    return this.first + this.second;
}

/** call 메소드
 * sum()을 실행하는 것과 같다.
 * 모든 함수는 call 메소드를 갖고있다.
 * sum.call(kim)을 실행하면 this = kim을 실행하는 것과 같다.
 */
console.log(sum.call(kim)); // 30
console.log(sum.call(lee)); // 3
```

```javascript
// call 메소드의 파라메터
const kim = {
    name: 'kim',
    first: 10,
    second: 20,
}
const lee = {
    name: 'lee',
    first: 2,
    second: 1
}
function sum(prefix) {
    return prefix + (this.first + this.second);
}

/** call 메소드 파라메터
    첫번째 인자는 호출하려는 함수의 this를 지정할 객체가 들어가고,
    두번째 인자부터는 호출하려는 함수의 파라메터가 들어간다.
 */
console.log(sum.call(kim, 'kim : ')); // kim : 30
console.log(sum.call(lee, 'lee : ')); // lee : 3 
```

### bind
call은 실행할때마다 객체의 this를 바꿔준다면,
아예 함수에 내부적으로 사용할 this를 영구적으로 고정해주는 함수를 리턴해주는 메소드이다.

bind메소드의 파라메터는,
- 첫번째 인자는 함수 내부의 this로 사용할 객체이고,
- 두번째 인자부터는 함수에서 사용할 인자를 넘길 수 있다.
- call과 같다.

bind를 사용하면 호출된 원래 함수가 변형되는 것은 아니고,
bind를 통해 새로운 함수가 생성되어 리턴된다.

```javascript
const kim = {
    name: 'kim',
    first: 10,
    second: 20,
}
const lee = {
    name: 'lee',
    first: 2,
    second: 1
}
function sum(prefix) {
    return prefix + (this.first + this.second);
}

// call
console.log(sum.call(kim, 'kim : ')); // kim : 30
console.log(sum.call(lee, 'lee : ')); // lee : 3 

// bind
const kimSum = sum.bind(kim, 'kim => ');
// 새로운 취지로 바뀐 함수가 리턴된다. sum이 바뀌는 것은 아니다.
console.log(sum.bind(kim, 'kim => ')());
console.log(kimSum());
```

## prototype vs __proto__

### 함수
javascript에서 함수는 객체이다.
객체이기때문에 property를 갖게 된다.

```javascript
// 함수를 표현하는 방법
function Person() {}
var Person = new function () {}
```

아래와 같은 함수를 정의했다면,
javascript에서는 2개의 객체가 생성된다.

```javascript
function Persion() {
    this.name = name;
    this.first = first;
    this.second = second;
}
```

[](./images/2.png)

Person 객체와 Person's prototype 객체이다.
이 둘은 서로 연관이 있다. 
Person 객체는 내부적으로 prototype이라는 property가 생기고,
그 property는 Person's prototype 객체를 가리킨다.

그래서 Person.prototype은 Person's prototype 객체를 의미한다.
[](./images/3.png)

Person's prototype 객체도 자신이 Person 객체 소속이라는 것을 알리기위해
자신의 constructor 프로퍼티를 만들고 이는 Person 객체를 가리킨다.
[](./images/4.png)

그래서 Person 객체와 Person's prototype 객체는 서로 참조하는 관계가 된다.

만약, prototype에 sum 함수를 정의했다면,
javascript는 Person's prototype에 sum이 있는지 찾고 없으면 생성한다.
```javascript
Person.prototype.sum = function () {}
```
[](./images/5.png)

이렇게 객체를 찍어내는 constructor 생성자 함수를 만들게 된것이다.


new를 이용해 kim이라는 객체를 생성했다면,
kim 객체는 Person이라는 생성자 함수가 생성되면서 this의 값이 셋팅된 결과
name, first, second라는 프로퍼티가 생성되는 동시에 __proto__ 라는 프로퍼티가 생성된다.
kim 객체가 생성될때 __proto__ 프로퍼티는 kim 객체를 생성한 Person의 prototype이 된다.
즉 __proto__는 Person.prototype 객체를 가리킨다.

그래서 Person.prototype을 통해서도, kim.__proto__를 통해서도
Person의 prototype 객체에 접근할 수 있게 된다.

```javascript
const kim = new Person('kim', 10, 20);
```
[](./images/6.png)

lee라는 또다른 객체를 생성해도 같은 결과가 나온다.
[](./images/7.png)


아래 코드를 실행하면,
```javascript
console.log(kim.name)
```
javascript는 kim 객체에 name 프로퍼티가 있는지 찾는다.
name 프로퍼티가 있기때문에 출력된다.
만약 없다면 kim의 __proto__에 name이 있는지 찾는다.
[](./images/8.png)

아래 코드를 실행하면,
```javascript
kim.sum(); 
```
[](./images/9.png)
javascript는 kim 객체에 sum메소드가 없기때문에
__proto__를 통해 sum이 있는지 찾는다.
만약 없다면 Person's prototype 객체의 __proto__를 찾는다....