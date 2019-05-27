# Destructuring (비구조화)

## Destructuring Array
let 변수에 여러개의 의미있는 배열 또는 오브젝트를 할당할때 효율적으로 사용 가능하다.
```javascript
let data = ['crong', 'honux', 'jk', 'jinny'];

let jisu = data[0];
let jung = data[1];
console.log(jisu, jung)
```
<br>

[jisu,,jung] 같이 배열화하여 값 할당 가능
```javascript
let data = ['crong', 'honux', 'jk', 'jinny'];

let [jisu,,jung] = data;
console.log(jisu, jung)
```

<br><br>

## Destructuring Object
비구조화를 이용하여 object 할당
```javascript
let obj = {
    name: 'crong',
    address: 'korea',
    age: 10
}

/*
name, age 변수에 obj.name, obj.age를 할당함
distructuring의 축약 가능 기능으로
let {name, age} = obj;
*/
let {name, age} = obj;
console.log(name, age);     // crong, 10

/* 
이름을 다르게 지정할수 있음
myName, myAge이 변수명임
*/
let {name: myName, age: myAge} = obj;
console.log(myName, myAge); // crong, 10
```

<br><br>

## Destructuring 활용 JSON파싱
필요한 변수를 추출할 수 있음
```javascript
var news = [
    {
      "topic": "news",
      "url": "https://api.hnpwa.com/v0/news/1.json",
      "maxPages": 10
    },
    {
      "topic": "newest",
      "url": "https://api.hnpwa.com/v0/newest/1.json",
      "maxPages": 10
    }
];
// newst 데이터 추출
let [,newest] = news;
console.log(newest)

// 방법1) newst의 topic, url 데이터 추출
let {topic, url} = newest;
console.log(topic, url)

// 방법2) newst의 topic, url 데이터 추출
let [, {topic, url}] = news;
console.log(topic, url)
```
<br><br>

## Destructuring 활용_Event객체전달
파라메터를 활용해서 distructuring을 쓰면 파싱을 쉽게 할 수 있다.

### case 1
```javascript
var news = [
    {
      "topic": "news",
      "url": "https://api.hnpwa.com/v0/news/1.json",
      "maxPages": 10
    },
    {
      "topic": "newest",
      "url": "https://api.hnpwa.com/v0/newest/1.json",
      "maxPages": 10
    }
];

function getNewsUrl([, {url}]) {    // 파라메터로 전달할때 distructuring 가능
    console.log(url);
}
getNewsUrl(news);
```
만약, 첫번째 배열이라면 아래와 같이 하면 된다.

```javascript
function getNewsUrl([{url}]) {    // 파라메터로 전달할때 distructuring 가능
    console.log(url);
}
```
<br>
### case 2
event를 전달받을때 필요한 값만 전달 할 수 있다.
```html
<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cum consequuntur maxime rem est adipisci ad, aspernatur molestiae cumque reprehenderit quo ipsa delectus dolorum vitae dicta. Reiciendis earum explicabo ea.</div>
```
```javascript
document.querySelector('div').addEventListener('click', function ({type, target}) {
    console.log(type, target.innerText)
});
```
