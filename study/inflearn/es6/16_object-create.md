# Object 객체 만들기
- javascript로 객체를 만든 방법을 알아본다.
- Object.create() - es5
- Object.assign()
- Object.setPrototypeOf() - es6

<br><br>
new로 object로 만들려면, function 선언하고, prototype 어쩌구 하고 하는 등 객체를 만드는 과정이 번거로운데,<br>
new 없이 object를 만드는 방법이 es6에 나왔다.

<br>

## Object.create() - es5
*Object.create()*를 사용하면, new로 생성했을 때와 같이 prototype 객체에 함수가 저장되는 것을 알 수 있다.
강사는 이 방법이 javascript에서 객체를 생성하는 가장 표준적인 방법이라고 말한다.
```javascript
const healthObj = {
    showHealth : function () {
        console.log('오늘 운동시간 : ' + this.time);
    }
}
const myHealth = Object.create(healthObj);
myHealth.time = '11: 20';
myHealth.name = 'crong';

// new로 생성한 것과 같이 prototype에 함수가 들어가있다.
console.log(myHealth);  /* {time: "11: 20", name: "crong"}
                            name: "crong"
                            time: "11: 20"
                            __proto__: Object
                        */
```

아쉬운 점은, 
```javascript
Object.create(healthObj);
```
은 단순히 object를 생성하는 것 뿐이고,
```javascript
myHealth.time = '11: 20';
myHealth.name = 'crong';
```
같은 객체의 값들을 일일히 넣어줘야 한다는 불편함이 있다.<br>
*Object.assign* 메소드를 쓰면 이런 번거로움을 없앨 수 있다.

<br><br>

## Object.assign()
첫번째 인자에는 object를, 두번째 인자에 객체 값을 넣을 수 있다.
```javascript
const healthObj = {
    showHealth : function () {
        console.log('오늘 운동시간 : ' + this.time);
    }
}
const myHealth = Object.assign(Object.create(healthObj), {
    name: 'crong',
    time: '11:30'
});

console.log('myHealth is ', myHealth);
/*
myHealth is  
{name: "crong", time: "11:30"}
name: "crong"
time: "11:30"
__proto__: Object
*/
```

Object.assign(Object.create(healthObj) 부분이 복잡해 보인다면 함수를 래핑해서 사용하는 방법을 고민해보자.

<br><br>

### Object assign으로 Immutable 객체만들기
```javascript
// 이전 데이터 객체가 있다고 가정하자.
const previousObj = {
    name: 'crong',
    time: '11:30'
}
// 파라메터 정보, Object.assign(객체, 이전 객체, 새로운 객체 데이터)
const myHealth = Object.assign({}, previousObj, {
    'name': 'honux',
    'time': '12:30',
    'age': 99
});

// previousObj 값에 새롭게 추가된 값이 덮어지면서 출력이 됨
// previousObj값이 들어가지만, previousObj와는 전혀 다른 객체가 생성되는 것이다.
console.log('myHealth is ', myHealth);  // myHealth is  {name: "honux", time: "12:30", age: 99}

// previousObj와 myHealth는 전혀 다른 객체이다.
// 새로운 객체를 만들어 반환하여 이전 데이터와 비교하거나, 이전 값으로 되돌리기 할때 유용함
console.log(previousObj === myHealth);  // false
```

<br><br>

## Object.setPrototypeOf()
~의 prototype 객체에만 추가하는 명확하고 단순한 기능을 제공한다.

```javascript
const healthObj = {
    showHeal : function () {
        console.log('오늘 운동시간 : ' + this.time);
    },
    setHealth : function (newTime) {
        this.time = newTime;
    }
}; 

const myHealth = {
    'name': 'crong',
    'time': '12:30',
};

// healthObj를 myHealth의 prototype객체에 추가시킨다.
Object.setPrototypeOf(myHealth, healthObj);

console.log(myHealth);
// 아래 결과를 보면, prototype 객체에 setHealth, showHeal 함수가 추가된 것을 알 수 있다.
/*
{name: "crong", time: "12:30"}
name: "crong"
time: "12:30"
__proto__:
setHealth: ƒ (newTime)
showHeal: ƒ ()
__proto__: Object
*/
```

setPrototypeOf를 사용하면 이처럼 Object.create를 쓰지 않고도 일반 객체에 prototype에 함수가 추가된 객체를 만들 수 있다.<br>

### setPrototypeOf의 반환값이 있을까?
newObj 변수에 담아 출력해보면 같은 결과값이 나온다.
즉, setPrototypeOf는 생성된 특정 객체를 반환한다.
```javascript
const newObj = Object.setPrototypeOf(myHealth, healthObj);

console.log('new object is ', newObj);
/*
{name: "crong", time: "12:30"}
name: "crong"
time: "12:30"
__proto__:
setHealth: ƒ (newTime)
showHeal: ƒ ()
__proto__: Object
*/
```

<br><br>

### Object.setPrototypeOf()로 객체간 prototype chain생성하기
chain을 사용하여 이미 짜여있는 함수를 자신의 prototype 객체에 추가 할 수 있다.<br>
childObj에 healthChildObj, healthObj 함수를 추가 할 수 있다.<br>
```bash
1단계 : healthChildObj <== healthObj
2단계 : childObj <== healthChildObj
결론 : childObj = healthChildObj + healthObj
```

```javascript
const healthObj = {
    showHealth : function () {
        console.log('오늘 운동시간 : ' + this.time);
    },
    setHealth : function (newTime) {
        this.time = newTime;
    }
}; 

const healthChildObj = {
    getAge : function () {
        return this.age;
    }
}

// healthChildObj 객체에 healthObj를 prototype 객체에 추가함
Object.setPrototypeOf(healthChildObj, healthObj);

const childObj = Object.setPrototypeOf({
    age: 22
}, healthChildObj);

console.log(childObj);  // healthObj함수가 prototype 객체에 추가됨
/*
{age: 22}
age: 22
__proto__:
getAge: ƒ ()
__proto__:
setHealth: ƒ (newTime)
showHealth: ƒ ()
__proto__: Object
*/

childObj.setHealth('11:55');    // 오늘 운동시간 : 11:55
childObj.showHealth();          // {age: 22, time: "11:55"}
```

### ref.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf