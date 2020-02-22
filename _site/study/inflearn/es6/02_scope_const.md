# const

## const - 선언된 변수 지키기
* 변화가 있으면 안되는 경우에 사용한다.
* 이는 수정불가의 의미가 아니라, 재할당이 안된다는 것이다.
<br>

```javascript
const home = 'my home';
home = 'my house';

// 에러남
```
<br><br>
const를 사용하더라도 배열과 오브젝트의 값을 추가/변경/삭제하는 것은 가능하다.<br>
불변을 의미하는 것이 아님<br>

```javascript
const list = ['apple', 'orange', 'banna']; 
list.push('watermelon');
console.log(list);  // 'apple', 'orange', 'banna', 'watermelon'
```
<br><br>
## const, let, var 사용규칙
이 3가지를 동시에 사용한다면 혼란스럽다. 이런 규칙을 써보자.
* const를 기본으로 사용한다.
* 그런데 변경이 될 수 있는 변수는 let을 사용한다.
* var는 사용하지 않는다.

<br><br>
## const 특성과 immutable array
```javascript
const list = ['apple', 'orange', 'watermelon'];
list2 = [].concat(list, 'banana');
console.log(list, list2)

/*
==> result
["apple", "orange", "watermelon"]
["apple", "orange", "watermelon", "banana"]
*/
```
<br>
list의 값은 그대로 둔 상태에서 list2라는 list를 기반으로 새로운 배열을 만들었다.<br>
여기서 list가 immutable array가 된다.
