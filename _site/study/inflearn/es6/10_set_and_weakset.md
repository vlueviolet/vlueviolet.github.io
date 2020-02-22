# Set & WeakSet
* array를 개선한 자료구조

## Set 으로 유니크한 배열만들기

### Set object?

- es6에서 제공하는 글로벌 오브젝트
- 중복없이 유일한 값을 저장할때나, 이미 존재하는지 체크할때 유용
- ref.
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  - methods https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Methods
  - http://chanlee.github.io/2016/08/15/hello-es6-part-3/

```javascript
let mySet = new Set();
// Set 오브젝트에 데이터 추가
mySet.add("crong");
mySet.add("hary");
mySet.add("crong");

// type 체크
console.log(toString.call(mySet)); // object

// 값 체크
console.log(mySet.has("crong"));  // true

mySet.forEach(function(value) {
  // 중복된 값을 제거하여 노출, crong이 중복 제거됨
  console.log(value); // crong, hary
});
```

```javascript
let mySet = new Set();
mySet.add("crong");
mySet.add("hary");
mySet.add("crong");
// 데이터 제거
mySet.delete("crong");

// 값 체크
console.log(mySet.has("crong")); // false

mySet.forEach(function(value) {
  // 중복된 값을 제거함
  console.log(value); // hary
});
```

<br><br>

## WeakSet?
- 참조를 가지고 있는 객체만 저장 가능하다.
- ref.
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
    - http://chanlee.github.io/2016/08/15/hello-es6-part-3/
- 객체가 불필요하게 된다면, 가비지 컬렉션이 되면서 weakset에서 삭제해준다.
- 객체 형태를 중복없이 저장해서 저장하려고 할때 유용하다.
- contructor를 사용하여 prototype의 메소드를 다이렉트로 부르는 것을 방지할 때 등

### 참조를 갖는 객체의 저장하는 예시
배열, 함수와 같은 참조를 갖는 오브젝트는 WeakSet에 저장 가능하다.
<br>
```javascript
let arr = [1,2,3,4];
let myWeakSet = new WeakSet();

// 참조를 갖는 배열이므로 정상 출력
myWeakSet.add(arr);           // WeakSet {Array(4)}
// 참조를 갖는 함수이므로 정상 출력
myWeakSet.add(function() {}); // WeakSet {ƒ}
// integer, string, null 같은 데이터이므로 참조가 없어 유효하지 않은 에러 출력
myWeakSet.add(111);     // 에러, Invalid value used in weak set
myWeakSet.add('111');   // 에러, Invalid value used in weak set
myWeakSet.add(null);    // 에러, Invalid value used in weak set

console.log(myWeakSet)
```
<br>

### 참조를 모니터링하는 WeakSet
**만약, 객체가 null 또는 필요가 없어지면 가비지 컬렉션 대상이 되어<br>
  WeakSet에서 이 정보가 없어지게 된다. 즉 참조를 모니터링하고 있다.**

```javascript
let arr = [1,2,3,4];
let arr2 = [5,6,7,8];
let obj = {arr, arr2};
let myWeakSet = new WeakSet();

myWeakSet.add(arr);
myWeakSet.add(arr2);
myWeakSet.add(obj);

console.log(myWeakSet)  // WeakSet {Array(4), {…}, Array(4)}

arr = null; // 또는 숫자, 참조를 제거하는 값

// arr의 참조를 제거했어도 값은 동일하게 나온다.
console.log(myWeakSet)  // WeakSet {Array(4), {…}, Array(4)}

// WeakSet에서 저장하고 있는 것처럼 보이지만, 유효하지 않은 객체라는 것을 알고 있기때문에 false 출력
console.log(myWeakSet.has(arr), myWeakSet.has(arr2));   // false, true
```
