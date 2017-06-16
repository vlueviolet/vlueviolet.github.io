# Gulp

+ 프로젝트 시 반복적인 일을 줄이기 위한 셋팅 자동화 툴
+ 새로고침 자동화나 코드 minify나, scss파일의 merge 등 플러그인이 제공되어 사용할 수 있다.
<br>
<br>

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
<br>
<br>
<br>

### 순서
0. node.js와 npm이 설치되어야 한다.
1. 폴더구조 생성
2. 작업위치에서 CMD 열기
	##### 현재 위치에서 CMD 여는 방법
	폴더 아이콘에서 [Shift+우클릭]하면, [여기에서 명령 창 열기] 클릭
3. CMD 창에 다음 명령어 입력
```javascript
npm install
npm init
npm install gulp -g
npm install gulp --save-dev
```
4. gulp 실행
```javascript
gulp
```
<br>
<br>
<br>

### 필수파일
+ [gulpfile.js](https://github.com/vlueviolet/vlueviolet.github.io/blob/master/study/gulp/gulpfile.js)<br>
+ [package.json](https://github.com/vlueviolet/vlueviolet.github.io/blob/master/study/gulp/package.json)
<br>
<br>
<br>

### bat, vbs 로 쉽게 실행하기
매번 이 과정을 거치기 싫다면?
<br><br>
#### vbs, bat관련 시작프로그램 레지스트리
<br>

+ 관리자
```javascript
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
```

+ 사용자권한
```javascript
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
```
<br>
<br>
<br>

### 참고링크
+ [Gulp Plugin](http://gulpjs.com/plugins/)
+ [Gulp 설치 등 설명](https://github.com/eu81273/gulp-step-by-step)
+ [Gulp 입문1](http://programmingsummaries.tistory.com/356)
+ [Gulp 입문2](http://programmingsummaries.tistory.com/377)
