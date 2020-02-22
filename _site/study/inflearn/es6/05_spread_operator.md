# spread operator - 배열의 복사, 몇가지 활용
* spread operator : 펼침 연산자
* 배열의 복사가 가능하고, immutable array처럼 복사한 이전 데이터와는 전혀 다른 새로운 데이터가 생성됨

```javascript
let pre = ['apple', 'orange', 100];
let newData = [...pre];			// 참조를 끊고, 메모리에 새로운 배열로 새로운 값이 생성된 상태, immutable array와 비슷함
console.log(pre, newData)		// 배열 출력
console.log(pre === newData)	// false 출력, 둘은 엄연히 다른 배열
```
<br><br>
## 배열의 합침
```javascript
let pre = ['apple', 'orange', 100];
let newData = [0, 1, 2, ...pre, 4 ];
console.log(newData)	// newData에 pre가 합쳐지는 새로 배열이 됨
```
<br><br>
## 배열의 전달의 용이
```javascript
function sum (a, b, c) {
    console.log(a+b+c);
}
var pre = [100, 200, 300];
sum(pre[0],pre[1],pre[2])
sum.apply(null, pre);
sum(...pre);
```