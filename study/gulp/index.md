# Gulp

### Folder Structure

```javascript
node_modules/		// gulp 설치시 자동생성,별도로 생성할 필요없음

////////////////////////// 생성해야 할 폴더구조 (s)
src/
	index.html
	img/
	scss/
dist/
	index.html
	img/
	css/
js/
	apps/
	libs/
gulpfile.js		// gulp 기본 셋팅파일
package.json		// gulp에서 사용할 플러그인 목록모음으로 npm install시 이 파일의 플러그인 목록을 가져다가 설치하게됨
////////////////////////// 생성해야 할 폴더구조 (e)

```
### 순서
1. 폴더구조 생성
2. 작업위치에서 CMD 열기
	##### 현재 위치에서 CMD 여는 방법
	폴더 아이콘에서 [Shift+우클릭]하면, [여기에서 명령 창 열기] 클릭
3. CMD 창에 다음 명령어 입력 (node.js 설치후)
```javascript
npm install
npm init
npm install gulp -g
npm install gulp --save-dev
```

### 필수파일
[gulpfile.js](https://github.com/vlueviolet/vlueviolet.github.io/blob/master/study/gulp/gulpfile.js)
[package.json](https://github.com/vlueviolet/vlueviolet.github.io/blob/master/study/gulp/package.json)
