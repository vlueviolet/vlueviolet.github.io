# point
<br>

## jQuery api 참고
[https://oscarotero.com/jquery/](https://oscarotero.com/jquery/)

<br>

## console.log
* 변수 및 다양한 정보들을 확인할 수 있는 매우 중요한 함수
* IE(Internet Explorer)는 8.x 이상에서만 지원되고, 이외의 웹 브라우저는 대부분 지원됨.
* 프로그램에 영향을 주지 않음
* 디버깅 용도로 사용 (디버깅이란 버그를 해결하다라는 의미)

```html
<script>
var currentIndex = 0;
console.log(currentIndex);
</script>
```
<br>

## 주석(Comment)
* 프로그램 작성시 코드를 설명하거나 기타 개발자의 참조 사항을 기록하기 위해 사용
* 한 줄 코딩의 주석은 '//'
* 여러 줄을 한 번에 주석 처리 하기 위해서는 '/ * 주석 * /'
* 프로그램에 영향을 주지 않음

```html
<script>
// 초기 index 설정
var currentIndex = 0;

/*
 선택자를 움직이게 하는 함수
 객체를 만들경우 파라미터에 대한 상세설명 담는방법으로 주석 활용
 */
var funcName = function () {
    ...
};
</script>
```
<br>

## 주요 선택자 비교

javascript | jQuery
---------- | ------ 
document.getElementById('id'); | $('#id');
document.getElementsByClassName('class'); | $('.class');
document.getElementsByName('names'); | $('[name="names"]');
document.getElementsByTagName('tagname'); | $('tagname');

<br>

## 주요 탐색자 비교

javascript | jQuery
---------- | ------ 
.parentNode<br><br><br> | .parent()<br>.parents()<br>.parentsUntil()
.childNodes / .children<br><br> | .children()<br>.find()
.nextSibling / .previousSibling<br>.nextSibling<br><br><br>.previousSibling<br><br><br> | .siblings()<br>.next()<br>.nextAll()<br>.nextUntil()<br>.prev()<br>.prevAll()<br>.prevUntil()
.firstChild | .first()
.lastChild | .last()
<br> | .eq()<br>.filter()<br>.not()

<br>

## 변수
* 어떤 값을 지속적으로 저장하여 필요할 때마다 사용할 수 있게 하는 저장소
* 변수명에 포함된 값들은 언제든지 변경할 수 있음
* javascript 내부적으로 미리 사용하는 키워드나 **예약어**는 사용하면 안됨
* 변수앞에 숫자 또는 특수기호/문자는 제외. 단, _(underscore)는 가능

```html
<script>
var 변수명 = 값;
</script>
```


**javascript 예약어**
<br>
abstract, boolean, break, byte, case, catch, char, class, const, continue, default, do, double, else, extends, final, finally, float, for, function, goto, if, implements, import, in, instanceof, int, interface, long, native, new, null, package, private, protected, public, return, short, static, super, switch, synchronized, this, throw, transient, try, var, void, while, with, false, true

<br>

## 변수의 범위
* 변수의 범위를 명확히 하려면, var 를 선언하는 것이 좋음
* 특정 함수 안에서 var를 통해 선언된 변수는 지역 변수로 인식되지만, var를 사용하지 않는 변수는 전역 변수로 인식

```html
<script>
// myAge 변수는 <script> 공간에 선언되었기 때문에 전역 변수로서 전체 영역에 영향을 미침
var myAge = 10;
var myFun = function () {
    // temp 변수는 function() 내부에 변수가 선언되었기 때문에 지역변수로써 함수 내부에만 영향을 미침
    var temp = 10;

    // total 변수는 함수 내부에 존재하지만 var 선언이 되어 있지 않기 때문에, 자동으로 전역 변수가 되어 전체 영역에 영향을 미침
    total = temp + 20;
};
var myFunc2 = function () {
    // temp 변수는 function() 내부에 변수가 선언되었기 때문에 지역변수로써 함수 내부에만 영향을 미침
    var temp = 20;
};
</script>
```
<br>

## 데이터 타입
* 변수에 담길 수 있는 값의 형태를 의미

<br>

**[숫자]**

* 숫자(Number) : 정수와 실수를 의미 [[참고](http://www.w3schools.com/js/js_numbers.asp)]

<br>

**[문자열]**

* 문자열(String) : 따옴표나 상따옴표를 사용해 문자열 구성 [[참고](http://www.w3schools.com/js/js_strings.asp)]

<br>

**[불린]**

* 불린(Boolean) : 참(1) 또는 거짓(0)을 나타내는 용도 [[참고](http://www.w3schools.com/js/js_booleans.asp)]

<br>

## 연산자
* 다양한 계산을 하기 위해 제공되는 기호

<br>

**[산술 연산]**

* ＋ , － , * , ／ , %

```html
<script>
var resultNum1 = 3 + 5;
var resultNum2 = 3 - 5;
var resultNum3 = 3 * 5;
var resultNum4 = 3 / 5;
var resultNum5 = 3 % 5;    
</script>
```
<br>

**[문자열 연산(+)]**

* ＋ 연산자의 피연산자 2개(문자와 문자, 문자와 숫자)를 연결하고 결과를 문자로 반환

```html
<script>
var resultStr1 = 'good' + 'time';
var resultStr2 = 'good' + 3;
</script>
```
<br>

**[비교 연산]**

연산 | 내용
---- | ----
&lt; | 보다 작음
&gt; | 보다 큼
&lt;= | 보다 작거나 같음
&gt;= | 보다 크거나 같음
== | 좌변과 우변이 같으면 참(true)
!= | 좌변과 우변이 다르면 참(true)

* 값을 비교하여 참과 거짓을 반환하며, 조건문에 많이 사용됨

```html
<script>
if (1 < 3) ;
if (1 > 3) ;
if (1 <= 3) ;
if (1 >= 3) ;
if (1 == 3) ;
if (1 != 3) ;
</script>
```
<br>

**[대입 연산(=)]**

* 변수 등에 값을 할당하는 데에 사용

```html
<script>
var x = 12;
</script>
```

* 좌변에는 항상 1개의 변수가 있어야 함

```html
<script>
// 잘못된 방식
var a + b = 3;
</script>
```

* 한 번에 여러 개의 값을 대입하려면 아래와 같이 표현

```html
<script>
var a = b = c = 10;
</script>
```
<br>

**[복합대입 연산(=)]**

연산 | 내용
---- | ----
= | 대입
*= | 곱하기 대입
/= | 나누기 대입
%= | 나머지 대입
+= | 더하기 대입
-= | 빼기 대입

* 변수의 값을 상대적으로 처리할 때에 많이 사용<br>예) a = a + 5 를 a += 5 로 줄여 쓸수 있음

```html
<script>
var a = 0;
var funcName = function () {
    a += 5;
};
</script>
```
<br>

**[기타 연산자]**

* 논리 연산자 : && , ||

```html
<script>
if ((1 < 3) && (3 < 5)) ;
</script>
```

* 증감연산자 : ++, --

```html
<script>
var num = 0;
num++;
</script>
```

* 삼항 연산자 : (조건) ? 식1 : 식2 (조건이 참일 때 식1, 거짓일 때 식 2를 실행)

```html
<script>
var type = (1 < 3) ? true : false;
</script>
```
