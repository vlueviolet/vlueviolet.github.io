# Array > for of - 순회하기

<br>

## forEach

```javascript
var data = [1, 2, undefined, NaN, null, ''];
data.forEach(function (index, value) {
    console.log(index, value);
});

// index와 값이 출력
```

<br><br>

## for-in
오브젝트를 순회하는 함수

만약, 배열에 사용한다면 문제점이 있다.
```javascript
var data = [1,2,undefined, NaN, null, ' '];
Array.prototype.getIndex = function () {};	// 상위 객체의 함수를 생성하면 for-in 순회시 포함됨

for (let index in data) {
    console.log(data[index]);
}

// console.log의 결과값에 function이 찍힌다.
```

object를 순회하려고 있는 함수인데<br>
자신이 갖고 있지 않는 상위의 값들도 포함하는 문제점 있기때문에<br>
배열(array)에서 쓰지 말자<br><br>

이런, for-in에 대한 문제점을 개선하기 위해 나온 함수가 for-of 함수 이다.
<br><br>

## for-of
배열, 문자열에 대한 순회 제공
```javascript
var data = [1,2,undefined, NaN, null, ''];
Array.prototype.getIndex = function () {};

for (let value of data) {
    console.log(value);		// 바로 값을 가져올 수 있다.
}
// 결과에 for-in처럼 function이 찍히지 않고, data 배열의 값이 잘 찍힌다.
```
<br>

string에서 사용한다면, 캐릭터 단위로 출력함
```javascript
var str = 'hello world ~!!';
for (let value of str) {
    console.log(value)
}
```
