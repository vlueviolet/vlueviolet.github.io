# Vue로 Nodebird SNS 만들기

- 강사 : 조현영
- https://www.inflearn.com/course/Vue-nodebird-sns/

## version

-

## nuxt

nuxt는 vue의 기본 기능에 편의를 위해 추가로 확장한 상위 프레임워크이다.

### 설치 및 실행

```bash
npm install nuxt
```

- `package.json`에서 명령어를 추가한다.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "nuxt"
},
```

```bash
npm run nuxt
```

## 폴더 구성

### pages 폴더

페이지 단위로 할 경우, 폴더명을 `/pages`로 하는 것이 좋다.
nuxt에서는 해당 폴더의 페이지들을 자동으로 읽어, 파일명도 라우터로 자동 연결해준다.
수정시 자동 리로딩된다.
next보다 디엑스적인 측면(개발자 경험)에서 좋다.

```bash
./pages
├── index.vue
├── profile.vue
├── signup.vue
└── user
    └── user.vue
```

위와 같이 파일이 구성되어있다면, 페이지가 자동 라우팅 되어 아래처럼 된다.

```
http://localhost:3000/
http://localhost:3000/profile
http://localhost:3000/signup
http://localhost:3000/user/user
```

### layouts 폴더

- layout을 넣어놓은 폴더로 `navigation` 같은 공통 사용되는 컴포넌트들을 관리한다.
- `default`는 말그대로 기본 설정이다.

```bash
./layouts
├── admin.vue
└── default.vue
```

### layout 속성

- 만약, 아래와 같이 다른 layouts를 사용한다면, `layout` 속성에 해당 파일명을 지정하면 된다. 이 속성은 nuxt가 편의를 위해 추가한 것이다.

```javascript
// profile.vue
export default {
  layout: 'admin'
};
```

### head 속성

- 페이지 title을 정의할 수 있다.

```javascript
// profile.vue
export default {
  head() {
    return {
      title: '프로필' // title을 설정함
    };
  }
};
```

- 이는 layout 단위에서도 정의할 수 있다. 아래와 같이 설정하면, head를 지정하지 않은 페이지에서는 이 title이 표시된다.

```javascript
// layouts/default.vue
export default {
  head() {
    return {
      title: 'NodeBird'
    };
  }
};
```

## 코드 스플리팅의 적용

vue는 수백만개의 컴포넌트들을 불러와서 화면에 보여준다.
이중에 5개만 사용하더라도 수백만개를 불러오기때문에 성능에 영향을 줄 수 있다.
이런 문제점때문에 코드 스플리팅이라는 기술이 나오고 nuxt가 이를 쉽게 적용을 해주었다.
nuxt는 pages 폴더안에 파일들을 개별 페이지로 인식한다. 여기서 문제는 페이지 넘어갈때 깜빡인다.
하지만 코드 스플리팅이라는 기술로, 다음에 갈 확률이 높은 페이지를 미리 로딩하여 앱처럼 넘어가게끔 해준다.
nuxt는 pages 폴더에서 코드 스플리팅도 하면서 기존 vue와 같이 매끄럽게 넘어가는 UX까지 제공해주는 프레임워크이다.

## nuxt에서 사용하는 태그

- `nuxt-link`: `router-link`와 같은 기능
- `nuxt`: `router-view`의 기능
