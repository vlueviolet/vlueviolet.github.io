# Object > 간단히 객체 생성하기 (오브젝트 선언방법)
<br>
object 생성시 키, 함수(function) 생략 가능

```javascript
const data = {
    name,
    getName() {},	// function 생략 가능
    age
};
```

object에서 키와 value가 동일하면 축약 가능

```javascript
function getObj() {
    const name = 'crong';

    const getName = function () {
        return name;
    }
    const setName = function (newName) {
        name = newName;
    }
    const printName = function () {
        cosole.log(name);
    }

    // case 1
    return {
        getName: getName,
        setName: setName,
        printName: printName
    }
    // case 2
    return {getName, setName, printName}
}
var obj = getObj();
console.log(obj);
```￼
