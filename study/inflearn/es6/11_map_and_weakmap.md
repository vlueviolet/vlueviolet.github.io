# Map & WeakMap
* object를 개선한 자료구조
* object에서 특정한 용도로 사용하기 위한 자료구조
* key, value 구성됨
* 객체뿐 아닌 추가정보를 같이 저장함

## Map
* Map 내용 생략..

## WeakMap
* WeakMap은 WeakSet과 유사하며, key/value로 객체의 추가정보를 중복없이 담을때 유용하다.
```javascript
let weakMap = new WeakMap();
let func = function () {

}
// 이 함수가 얼마나 실행됐는지를 알려고 할때

weakMap.set(func, 0);
console.log(weakMap);   // WeakMap {ƒ => 0}

let count = 0;
for (let i = 0; i<10; i++) {
    count = weakMap.get(func);  // key값에 따른 value 값을 얻음, get value
    count++;
    weakMap.set(func, count);
}
console.log(weakMap);           // WeakMap {ƒ => 10}
console.log(weakMap.get(func)); // 10

// 값이 없을때, 가비지 컬렉션이 되어 삭제됨 (weakset과 동일)
func = null;
console.log(weakMap.get(func)); // undefined
console.log(weakMap.has(func)); // false
```

## WeakMap 클래스 인스턴스 변수 보호하기
클래스 인스턴스에서 생성한 객체가 클래스 내부 변수에 접근할 수 없는 private한 변수를 만드는 방법
```javascript
// 클래스 인스턴스에서 생성한 객체
let myarea = new XXX;
```
<br><br>

### 클래스 인스턴스 객체가 접근할수 있는 케이스
```javascript
function Area(height, width) {
    // this.변수를 만들면 클래스 인스턴스 어디서든 접근 가능한 변수가 된다.
    this.height = height;
    this.width = width;

}
Area.prototype.getArea = function () {
    return this.height * this.width;
}
let myarea = new Area(10, 20);
console.log(myarea.getArea());  // 200

// myarea 생성자를 이용하여 height값에 접근 가능
console.log(myarea.height);     // 10
```

<br><br>

### 클래스 인스턴스 객체가 접근할수 없는 케이스 (WeakMap 사용)
클래스에서 전역변수를 만들때, WeakMap을 사용하여 효율적으로 만들어보자.
WeakMap을 사용하면 인스턴스 객체에서 접근되지 않는 private한 변수로 만들수 있다.

```javascript
// WeakMap을 생성하여, Area()에 관한 추가정보를 담아놓는다.
const wm = new WeakMap();   // 전역공간에 위치한 WeakMap

function Area(height, width) {
    // 현재값에 height, width 두가지 값을 wm에 몰래 숨겨놓는다.
    // Area클래스는 height, width에 대한 인스턴스 정보를 갖고있지 않아도 된다.
    wm.set(this, {height, width});
}
Area.prototype.getArea = function () {
    // 지역변수라면, 외부 접근이 안되므로
    const {height, width} = wm.get(this);
    return height * width;
}
let myarea = new Area(10, 20);
console.log(myarea.getArea());  // 200

// 외부 접근이 안되므로
console.log(myarea.height);     // undefined
// wm에 this가 저장되어 있어
console.log(wm.has(myarea));    // true
console.log(wm.get(myarea));    // {height: 10, width: 20}

// WeakMap의 장점인 가비지 컬렉션 관리를 활용해본다면,
myarea = null;
// height, width값이 있는것처럼 보임
console.log(wm);                // WeakMap {Area => {…}}
// null로 바뀌면서 가비지 컬렉션 대상으로 삭제됨
console.log(wm.has(myarea));    // false
console.log(wm.get(myarea));    // undefined
```
<br><br>

### 클래스 인스턴스 객체가 접근할수 없는 케이스 (WeakMap 사용 X)
값이 null일때, height, width 값은 출력되지만 가비지 컬렉션 대상이 되지 않음 (메모리 비효율)

```javascript
const obj = {};
function Area(height, width) {
    obj.height = height;
    obj.width = width;
}
Area.prototype.getArea = function () {
    return obj.height * obj.width;
}
let myarea = new Area(10, 20);
console.log(obj);  // {height: 10, width: 20}
myarea = null;

// 가비지 컬렉션 대상이 되지 않음
console.log(obj);  // {height: 10, width: 20}
```