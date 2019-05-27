# Array.from
<br>
# Array.frome
## 진짜 배열 만들기
가짜배열을 진짜 배열로 만들어 주는 메소드
<br><br>

배열값 뒤에 느낌표(!)를 붙여주는 함수가 있다고 하자.
```javascript
function addMark () {
    let newData = [];
    for (let i = 0; i < arguments.length; i++) {
        newData.push(arguments[i] + '!');
    }
    console.log(newData);
}
addMark(1,2,3,4,5);
```
<br>
javascript는 함수에서 파라메터를 정의하지 않아도, arguments 객체를 이용해서 인자값을 배열과 비슷한 형태로 들어오게 된다.<br>
arguments는 파라메터 개수가 유동적일때 사용하면 유용하다. 권장하는 패턴은 아니지만 상황에 맞게 쓰면 좋다.<br>
<br>
하지만, 이런 배열과 비슷한 배열은 진짜 배열이 아니기때문에<br>
arguments.map()과 같이 배열에 사용하는 함수에서는 오류가 난다.<br>

```javascript
function addMark () {
    let newData = arguments.map(function (value) {
        return value + '!';
    });
    console.log(newData);	// error
}
addMark(1,2,3,4,5);
```
<br>
javascript에는 이런 가짜 배열이 arguments, querySelectorAll, nodeList 등 이런 가짜 배열들이 존재하는데,<br>
이런 가짜배열을 진짜 배열로 만들어 주는 것이 바로 from이다.
```javascript
function addMark () {
    let newArray = Array.from(arguments);	// arguments로 부터 배열을 만든다.
    let newData = newArray.map(function (value) {
        return value + '!';
    });
    console.log(newData);
}
addMark(1,2,3,4,5);

toString.call(array);	// type을 알아볼때 씀
```
