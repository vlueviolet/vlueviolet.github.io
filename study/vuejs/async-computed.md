
# AsyncComputed

> vuejs의 computed 속성은 "해당 속성이 종속된 대상이 변경될 때만 함수를 실행"된다고 합니다.
> computed 속성에서 선언한 data, prop 등 관련된 값(종속된)들의 업데이트가 발생했을때 로직을 처리하고, 화면을 갱신해주죠.

## computed에서 비동기 방식을 사용할 수 있을까?

vuejs 프로젝트를 하면서, `computed` 속성을 많이 사용하지만,  
동기적으로 발생하는 속성이기때문에 비동기적인 처리에는 사용하기 어렵습니다.  

fetchData 함수에서 3초 뒤에 resolve되는 promise를 정의했습니다.  
resolve에 response값이 있다면, 실제로는 데이터값을 넘겨받길 기대하고 작업을 하죠.
예제에서 response를 'resolve'라는 string으로 대신했습니다.

이를 computed에서 timeComputed로 출력하면,
기대했던 'resolve' string 대신 promise 인스턴스를 반환합니다.

```html
<p>{{ getData }}</p>
```

```javascript
computed: {
  getData() {
    return this.fetchData();
  }
},
methods: {
  fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolve!!");
      }, 3000);
    });
  }
 }
```
결과화면
```console
[object Promise]
```

만약, 반환된 promise 인스턴스로 then을 하면, 아래와 같은 경고가 발생합니다.

> computed 속성에서 예상치못한 비동기 액션

![image](https://user-images.githubusercontent.com/26196090/74913143-6d15c600-5403-11ea-8460-7c75beca0c21.png)


```javascript
computed: {
  getData() {
    return this.fetchData().then(d => console.log(d));
  }
},
```

## computed의 비동기적 사용의 대체 : asyncComputed

computed에서 비동기적인 값을 받아올 수 없기때문에,
`asyncComputed`라는 플러그인을 사용합니다. (참 고마운 개발자입니다.)

> 설치 및 사용방법과 왜 asyncComputed를 써야하는지에 대해 아래 링크에서 볼 수 있습니다.
> URL : [https://github.com/foxbenjaminfox/vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed)

asyncComputed를 설치하면, computed와 같은 속성으로 선언하여 사용할 수 있습니다.

```html
<p>{{ asyncGetData }}</p>
```
```javascript
asyncComputed: {
  asyncGetData() {
    return this.fetchData();
  }
},
methods: {
  fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolve!!");
      }, 3000);
    });
  }
 }
```
결과화면
```console
resolve!!
```