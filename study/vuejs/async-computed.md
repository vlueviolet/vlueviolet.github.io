
# AsyncComputed

> vuejs의 `computed` 속성은 "해당 속성이 종속된 대상이 변경될 때만 함수를 실행"된다고 합니다.  
> computed 속성에서 선언한 data, prop 등 관련된(종속된) 값의 update가 발생했을때 로직을 처리하고, 화면을 갱신해주죠.

## computed에서 비동기 방식을 사용할 수 있을까?

대답은 아쉽지만, `No` 입니다.

Vuejs 프로젝트를 하면서, `computed` 속성을 많이 사용하지만,  
`동기적으로 발생하는 속성`이기때문에 비동기적인 처리에는 사용하기 어렵습니다.  

비동기 방식으로 사용했을 때 어떻게 출력되는지 예시를 통해 알아보겠습니다.  

### computed에서의 비동기 방식

`fetchData` 함수에서 3초 뒤에 resolve되는 promise를 정의했습니다.  

만약, 성공했다면 작업에서는 resolve에 response 값을 받아 작업을 이어가게 됩니다.  
예제에서는 response 값을 'resolve'라는 string으로 대신했습니다.  

이를 computed에서 getData로 출력하면,  
기대했던 'resolve!!' string 대신 promise 인스턴스를 반환합니다.

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

#### 결과화면
```console
[object Promise]
```

실패했다면 reject의 'failed'가 아닌, 콘솔창에 오류화면이 출력됩니다.
#### 결과화면
<img src="https://user-images.githubusercontent.com/26196090/74915127-04304d00-5407-11ea-9dec-7e328aa52c3e.png" alt="">

### computed에서의 비동기 방식 : then

또 반환된 promise 인스턴스로 then을 하면, 아래와 같은 경고가 발생합니다.

```javascript
computed: {
  getData() {
    return this.fetchData().then(d => console.log(d));
  }
},
```

#### 결과화면
> computed 속성에서 예상치못한 비동기 액션
<image src="https://user-images.githubusercontent.com/26196090/74913143-6d15c600-5403-11ea-8460-7c75beca0c21.png" al="">


## computed의 비동기적 사용의 대체 : asyncComputed

이 모든 것을 가능하게 하는 플러그인이 있습니다.  
바로 `asyncComputed` 입니다. (참 고마운 개발자죠.)  

이름 그대로 async + computed의 조합으로 비동기 방식을 사용할 수 있게 해줍니다.

> 설치 및 사용방법과 왜 asyncComputed를 써야하는지에 대해 아래 링크에서 볼 수 있습니다.  
> URL : [https://github.com/foxbenjaminfox/vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed)

asyncComputed를 설치하면, computed와 같은 속성으로 선언하여 사용할 수 있습니다.

아까 위의 예제와 동일한 방식으로 promise를 받아오도록 하면,  
결과값을 잘 받아오는 것을 알 수 있습니다.

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
#### 결과화면
```console
resolve!!
```

## 전체 예시코드
- [computed vs asyncComputed](https://codesandbox.io/s/computed-vs-asynccomputed-t3orr?fontsize=14&hidenavigation=1&theme=dark)

## Ref
- https://alligator.io/vuejs/async-computed-properties/
