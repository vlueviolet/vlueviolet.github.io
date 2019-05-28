# 실습예제 2 - Destructuring 과 Set 을 활용한 로또 번호 생성기

## lotto 번호 만들기
* 유일한 값을 추출하는 과정에서 Set을 사용한다.
* getRandomNumber함수에 변수를 전달하는 과정에서 destructuring을 사용한다.


```javascript
/* 기본 제공 코드 */
const SETTING = {
    name: 'LUCKY LOTTO!',
    count: 6,
    maxNumber: 45
}

function getRandomNumber(maxNumter) {
    // 랜덤한 유일한 숫자값을 추출
}
```

### 내방식
```javascript
const SETTING = {
    name: 'LUCKY LOTTO!',
    count: 6,
    maxNumber: 45
}

const createRandomNumber = function (count) {
    return Math.floor(Math.random()*(count)) + 1;
}
const getRandomNumber = function (maxNumber) {
    let ranNum = createRandomNumber(maxNumber);
    if (mySet.has(ranNum)) {
        getRandomNumber(maxNumber);
    } else {
        mySet.add(ranNum);
    }
}


let {count, maxNumber} = SETTING;
let mySet = new Set();
for (let i = 0; i < count; i++) {
    getRandomNumber(maxNumber);
}
console.log('lotto:', mySet)
```