# Template

## Template이 중요한 이유
json으로 응답을 받고, javascript로 변환한 후에 어떠한 데이터처리 조작을 한 후에 dom 추가하는 경우<br>
데이터 + html 문자열의 결합이 필요하기 때문에

```javascript
// 기본 예제
const data = [
    {
        name: 'coffee-bean',
        order: true,
        items: ['americano', 'milk', 'green-tea']
    },
    {
        name: 'starbucks',
        order: false
    }
];
// 백스텝을 이용하여 원하는 입력하고자 하는 데이터 영역에 ${}를 주차갛ㅁ
const template = `<div>welcome ${data[0].name}</div>`;
console.log(template);  // coffee-bean
```

<br><br>

## Tagged Template literals
함수에서 template을 반환하여 사용함
```html
<ul id="message"></ul>
```
```javascript
// forEach활용
const data = [
    {
        name: 'coffee-bean',
        order: true,
        items: ['americano', 'milk', 'green-tea']
    },
    {
        name: 'starbucks',
        order: false
    }
];

function fn(tags, name, items) {
    if (typeof(items) === 'undefined') {
        items = '<span style="color:red">주문가능한 상품이 없습니다.</span>';
    }
    return (tags[0] + name + tags[1] + items + tags[2]);
}

data.forEach(v => {
    let template = fn`<li><h2>welcome <span style="color:brown">${v.name}</span></h2><h3>주문 가능 항목</h3><p>${v.items}</p></li>`;
    document.querySelector('#message').innerHTML += template;
})
```