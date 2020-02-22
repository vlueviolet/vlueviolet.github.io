# NPM (Node Package Module)

npm은 node를 설치하면 자동으로 설치되며, node의 패키지 모듈을 관리한다.

## npm 세팅 - package.json을 생성하는 방법 1

`npm init` 명령어를 실행하여 npm을 세팅한다.

```bash
npm init
```

- package name : 폴더명과 동일
- version : 내가 만들 앱의 버전이 몇인지?
- description : 앱의 설명
- entry point : 내가 만들 앱의 첫번째 트리거 즉 시동을 걸어주는 파일이 무엇인지?
- test command : pass
- git repository : pass
- keywords: pass
- author : 자신
- licene : 일반적으로 쓰는것 MIT

이렇게 세팅을 하면 `package.json`이 형성된다.
앞으로 작성할 앱의 사령부 같은 역할을 하는 코드가 들어가있다.

## npm 세팅 - package.json을 생성하는 방법 2

아래와 같이 일일히 지정하는 방식으로도 package.json파일을 생성할 수 있다.

```bash
npm set init-author-name "vlueviolet"
npm set init-license "MIT"
// ... 다 입력하면,
npm init -yes
// 또는
npm init -y
```

설정된 값을 삭제하고 싶다면,

```bash
npm config delete init-author-name
npm init -y
```

## dependencies

lodash를 사용하여 앱을 작성해보자

```bash
npm install lodash --save
```

그러면, `node_modules` 폴더가 생성되고, `dependencies`가 생성되었다.
대게 버전은 x.x.x 같이 3개의 숫자로 구성된다.

- 첫번째 : 메인 업그레이드, 즉 통째로 업그레이드가 되었을 때 올라간다.
- 두번째 : 스몰 업그레이드, 적은 규모의 업데이트시
- 세번째 : 버그 fix
- ^4.x.x같이 캐럿(caret, 곡절부호, ^)가 적혀있으면 최신 버전을 가져와서 설치하라는 의미로, ^4.17.4라면 4.17번대의 최신 버전을 가져오라는 의미
- 첫번째 자리가 바뀌면, 이전에 내가 쓰던 앱과 호환이 안될 수도 있기 때문에 메인 업그레이드가 발생할때는 별도의 방식으로 업그레이드를 해줘야 한다.

## index.js를 만들자.

왜? entry point를 index.js로 하겠다고 했으니까

https://lodash.com/ 사이트에 나오는 js 구문을 index.js에 넣어보자.

```javascript
_.defaults({ a: 1 }, { a: 3, b: 2 });
// → { 'a': 1, 'b': 2 }
_.partition([1, 2, 3, 4], n => n % 2);
// → [[1, 3], [2, 4]]
```

설치한 lodash를 사용하기 위해서는 require로 불러와야 한다.

```javascript
const _ = require('lodash');

const defaults = _.defaults({ a: 1 }, { a: 3, b: 2 });
// → { 'a': 1, 'b': 2 }
_.partition([1, 2, 3, 4], n => n % 2);
// → [[1, 3], [2, 4]]

console.log(defaults); // { a: 1, b: 2 }
```

그리고 아래 명령어로 index.js를 실행해보자.

```bash
node index
```

이렇게 추가한 패키지를 사용할 수 있다.

## npm 앱 공유하기

내가 만든 앱을 다른 사람이 쓸 수 있도록 npm에 올릴 수 있다.
package.json은 굉장히 큰 repository와 같다.
반대로 남이 만든 앱을 내가 받을 수도 있다.

하지만, 내가 만든 앱에 비해 너무 많은 많은 패키지들이 node_modules에 깔리기 때문에 배보다 배꼽이 더 큰 경우가 았다.

### 내가 만든 부분만 뽑아서 공유하는 방법

index.js와 package.json을 폴더로 묶으면 된다.
상대방은 npm install 명령어를 통해 설치만 하면 된다.

```bash
npm install
```

npm은 dependencies의 lodash를 설치 필요성을 인지하고, lodash가 의존하는 많은 패키지들을 설치하게 된다.

이렇게 npm은 앱을 공유할 때 아주 유용하다.

## production 옵션

gulp 패키지를 추가해보자.

아래 명령어를 치면, devDependencies에 추가된다.

```bash
npm install gulp --save-dev
```

근데 만약, 상대방에게 gulp가 필요없다면, 아래 명령어면 치면 된다.

```bash
npm install -production
```

devDependencies는 개발 작업에 필요한 패키지들이기때문에
production 명령어가 적용되는 것 같다.

## uninstall, remove, update

### 설치한 패키지를 삭제하는 방법

gulp를 삭제하려 한다면, gulp가 devDependencies에 위치하므로, --save-dev를 붙여 해당 위치까지 지정해준다.<br>
dependencies에 위치하는 패키지 삭제는 --save만 하면 된다.

```bash
npm uninstall gulp --save-dev
npm remove gulp --save-dev
npm rm gulp --save-dev
```

### 특정 버전을 설치하고 싶을 때

@뒤에 버전을 붙인다.

```bash
npm install lodash@4.17.3
```

### 업데이트 하는 방법

```bash
npm update lodash
```

```javascript
- ^4.17.4 : 메이저 버전 두고 마이너 버전만 업데이트 해라 (캐럿 기호)
- ~4.17.4 : 메이저, 마이너 버전 두고, 패치 버전을 업데이트 해라 (틸트 기호)
- * : 모든 버전의 최신, 메이저 버전까지도 최신 버전으로 업데이트 해라
```

## global and local installation

### global

-g 옵션을 사용했을때 패키지가 어디에 설치되는지는 아래 명령어를 통해 알 수 있다.
(`/usr/local/lib/node_modules`)

```bash
npm root -g
```

- `npm install nodemon` : 현재 npm-tutorial > node_moduls 폴더에 설치
- `npm install nodemon -g` : /usr/local/lib/node_modules에 설치

## scripts

npm 실행 명령어를 설정할 수 있다.
리눅스에서 alias(시스템 명령어 단축)와 같은 기능을 한다.<br>
기본적으로 test가 들어가는데, 더 찾아봐야 할듯.. 이 강좌에선 설명 pass

```json
"scripts": {
  "start": "node index"
},
```

이렇게 설정하면 npm start시 nodex index가 실행된다.

live-server라는 패키지로 테스트 해보자.
실행 명령어는 server로 해보자.

```json
"scripts": {
  "start": "node index",
  "server": "live-server"
},
```

live-server와 같은 구동이 필요한 경우는 npm run으로 실행한다.

```bash
npm run server
```
