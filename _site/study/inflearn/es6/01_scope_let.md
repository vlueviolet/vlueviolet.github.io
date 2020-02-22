# let
javascript는 스코프 체인에 의해 지역 스코프에서 i를 찾고, 없으면 전역으로 올라가서 값을 찾는다.<br>
아래와 같은 경우는 console.log(i)가 for문에 속하는 i가 아니지만 스코프 체인에 의해 100이 출력된다.
```javascript
function cal () {
	for (var i = 0 ; i < 100 ; i++) {
		...
	}
	console.log(i);	// 100

}
```

비슷하게, let변수를 사용하면, 에러가 난다.
<br><br>

## let과 closure

```html
<ul className="list">
<li>javascript</li>
<li>java</li>
<li>python</li>
<li>django</li>
</ul>
```
```javascript
var list = document.querySelectorAll('li');
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function () {
        console.log(i + '번째 리스트 입니다.')
    });
}
```
```javascript
// result
4번째 리스트 입니다.
4번째 리스트 입니다.
4번째 리스트 입니다.
4번째 리스트 입니다.
```

## 왜?
click 이벤트에 걸려있는 함수가 실행될때, 해당 함수 스코프에서는 i와 연결되지 않기때문에<br>
마지막에 실행되는 i값을 전역으로 찾게된다.<br>
이런걸 closure라고 함
<br><br>
let으로 이벤트 리스너가 생성될때, i의 스코프가 정해지기때문에 해당 function에서 이 값을 참조할 수 있음


## 추가 링크
* var, let, const : https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d
