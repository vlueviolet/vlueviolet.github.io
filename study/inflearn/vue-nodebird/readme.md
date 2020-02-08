# Vue로 Nodebird SNS 만들기

- 강사 : 조현영
- https://www.inflearn.com/course/Vue-nodebird-sns/

## version

## nuxt

- 공식 문서 : https://ko.nuxtjs.org/
- nuxt는 vue의 기본 기능에 편의를 위해 추가로 확장한 상위 프레임워크이다.
- SEO, 라우터, 코드 스플리팅 제공

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
npm run dev
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

- layout을 넣어놓은 폴더로 `navigation` 같은 공통으로 사용하는 컴포넌트들을 관리한다.
- 폴더명은 `layouts`으로 해야한다. nuxt가 폴더명을 자동으로 읽어 layout이 있는 폴더임을 알 수 있다.
- 그 안에는 `default.vue`를 만든다. 이는 말그대로 기본 설정이다.

```bash
./layouts
└── default.vue
```

#### layout 추가

layout이 default 외에 에러페이지, 로그인 등 다른 layout 구조를 갖는 페이지가 있다면, `layouts`에 다른 파일을 추가하면 된다. (예시, admin.vue)

```bash
./layouts
├── admin.vue
└── default.vue
```

#### layout 속성

그리고 아래와 같이 `layout` 속성에 해당 파일명(admin)을 등록해주면 이 레이아웃 구성으로 화면을 노출 할 수 있다.<br>즉, profile 페이지는 다른 레이아웃이 적용된다.<br>layout 속성은 nuxt가 편의를 위해 추가한 것이다.<br>이렇게 공통으로 잡아야 하는 것들을 nuxt가 자동으로 해주기 때문에 편리하다.

```javascript
// profile.vue
export default {
  layout: 'admin',
  head() {
    return {
      title: '프로필'
    };
  }
};
```

#### head 속성

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

- 이는 layout 단위에서도 정의할 수 있다. 아래와 같이 설정하면, head를 지정하지 않은 페이지에서는 default에서 정의한 title이 표시된다.

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

만약, 이런 경우가 있다고 가정하자. default, admin 모두 title이 동일하면 중복이 발생한다. 이럴때, nuxt에서는 중복을 제거하는 방법을 제공한다.

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

```javascript
// layouts/admin.vue
export default {
  head() {
    return {
      title: 'NodeBird'
    };
  }
};
```

## 중복을 제거하는 방법

`nuxt.config.js` 파일을 생성해서 `head`를 추가하고, 기존에 작성한 head는 제거한다.

```javascript
// nuxt.config.js
module.exports = {
  head: {
    title: 'NodeBird'
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

```javascript
<template>
  <div>
    <!-- <router-link> -->
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/profile">Profile</nuxt-link>
      <nuxt-link to="/signup">Signup</nuxt-link>
    </nav>
    <!-- <router-view> -->
    <nuxt />
  </div>
</template>
```

## vuetify

- 컴포넌트 UI
- 링크 : https://vuetifyjs.com/ko/
- npm : https://www.npmjs.com/package/@nuxtjs/vuetify
- react에서는 ant-design을 많이 사용하고, vue에서는 vuetify를 많이 사용한다.

### 설치

```bash
npm i vuetify
npm i @nuxtjs/vuetify
```

`npm i @nuxtjs/vuetify` 명령어를 실행하고 error가 발생했는데, 아래 명령어를 실행하여 xcode라는 것을 설치하고 다시 vuetify 명령어를 실행하니 설치가 잘 되었다.

```bash
xcode-select --install
```

### nuxt에서는 외부 라이브러리를 연결하는 방식이 조금 독특하다.

nuxt에서는 아래와 같은 방식을 사용하지 않는다.

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(vuex);
Vue.use(vue - router);
```

#### 왜??

nuxt는 위 방식은 모든 파일마다 상단에 추가되는 구문들이기 때문에 중복을 방지하기 위해서 위 구문을 쓰지 않는다.
nuxt.config.js가 nuxt의 가장 기본 설정들을 할 수 있고, 외부 라이브러리나 빌드할때 어떻게 압축하고 웹팩을 어떻게 사용할지 작성할 수 있다.<br>

modules에 설치한 @nuxtjs/vuetify 설치한 패키지를 적어주면 자동으로 연결된다.
이 부분은 공식 문서를 참고하자. 강좌 촬영시에는 modules에 추가가능했는데, 지금은 buildModules에 추가하라고 나온다.

```javascript
// nuxt.config.js
module.exports = {
  head: { ... },
  buildModules: ['@nuxtjs/vuetify']
};
```

또 vuetify에 대한 설정도 할 수 있다. 이는 modules에서 vuetify 패키지를 연결했기때문에 가능하다.
`modules/@nuxt/vuefify/lib/templates/plugin.js`에 가면 Vue.use() 구문이 있는 것을 볼수 있다.<br>
nuxt가 중복을 해결하기 위해, nuxt.config.js에 modules, plugin 같은 객체를 사용해서 모든 파일에 적용해준다.
알아서 모든 페이지에 붙여준다. 그래서 개발자 입장에서는 중복을 제거해주니 좋다.<br>axios도 설치 후에 마찬가지로 추가 할 수 있다.

## vuetify 적용

layouts/defult.vue의 최상단 태그는 `<v-app></v-app>`으로 한다. 이렇게 작성하지 않으면, vuetify에 적용된 style이 다 깨진다.

## axios

### 설치

```bash
npm install @nuxtjs/axios axios
```

```javascript
// nuxt.config.js에 추가하기
module.exports = {
  head() { ... },
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {

  },
};
```

## es
dd . d
