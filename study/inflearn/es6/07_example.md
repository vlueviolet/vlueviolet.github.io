# 실습 예제 1 풀어보기
filter, includes, from을 사용해서 문자열 'e'가 포함된 노드로 구성된 배열을 만들어서 반환하기

<br>
## 방법 1

```javascript
function print() {
    let array = Array.from(document.querySelectorAll('li'));    // li 노드로 구성된 배열
    console.log(typeof(array));			// type 알아볼때 방법1
    console.log(toString.call(array));	// type 알아볼때 방법2
    let newArray = array.filter(function (el, index) {
        return el.innerText.includes('e');
    });
    console.log(newArray)
}
print();
```

<br><br>

## 방법 2
```javascript
function print() {
    let nodeArray = document.querySelectorAll('li');    // li 노드로 구성된 배열
    let array = [];
    for (let value of nodeArray) {
        array.push(value.innerText);
    }
    console.log(typeof(array));			// type 체크하는 방법1
    console.log(toString.call(array));	// type 체크하는 방법2
    let newArray = array.filter(function (el, index) {
        return el.includes('e');
    });
    console.log(newArray)
}
print();
```
