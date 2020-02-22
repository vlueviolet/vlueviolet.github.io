# ES2015 String 에 새로운 메서드들
라이브러리에서 제공되던 메소드들이 표준으로 제공됨
<br>
## startWith(text)
text로 시작하는 문자열 일치 여부 반환
```javascript
var str = 'hello world~~';
var text = 'hello';
console.log(str.startWith(text));   // true
```

<br>

## endWith(text)
text로 끝나는 문자열 일치 여부 반환
```javascript
var str = 'hello world~~';
var text = '~~';
console.log(str.endWith(text));		// true
```
<br>

## includes(text)
text를 포함하고 있는지 여부 반환
```javascript
var str = 'hello world~~';
console.log(str.includes('world')); // true
```

<br>

## 그 외 추가된 메소드
* http://gnujoow.github.io//dev/2016/10/14/Dev6-es6-array-helper/
