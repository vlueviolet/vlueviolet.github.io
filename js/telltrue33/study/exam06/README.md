# point
<br>

## Array
* 하나의 변수에 여러 개의 데이터를 담을 수 있는 그릇 or 여러 개의 변수를 한꺼번에 다룰 수 있는 자료
* 대괄호[]를 사용해 생성하고 안에 쉼표로 구분해 자료를 입력
* 여러 개의 변수를 인덱스 번호로 관리
* []를 지정 안해도 여러 개의 값이 들어있으면 무조건 배열

```html
<script>
// 배열 생성 및 요소 추가
var array = [];
array[0] = 데이터 1;
array[1] = 데이터 2;
array[2] = 데이터 3;

// 배열 요소에 접근하는 방법
var array2 = [273, 'String', true, function () {}, {}, [273, 103]];
console.log(array2[3]);

// 배열 길이 체크
var array3 = [10, 20];
console.log(array3.length);
// 다시 초기화
array3 = [];
console.log(array3.length);
</script>
```

### Array Method
* join - 문자열로 리턴 (원본 변경 X)
* reverse - 거꾸로 변경
* sort - 배열 정렬
* concat - 배열 이어 붙임 (원본 변경 X)
* slice - 부분 배열 반환 (원본 변경 X)
* splice - 추가/삭제
* push, pop - 맨뒤 추가/삭제
* shift, unshift - 맨앞 추가/삭제
<br>

## Object
* 데이터와 연산 작업을 함께 담고 있는 덩어리
* 배열과 매우 비슷하지만, 훨씬 구체적이고 상세함

```html
<script>
// 객체 생성 및 요소 추가
var obj = {};
obj.a = 데이터 1;
obj.b = 데이터 2;
obj.c = 데이터 3;

// 객체 요소에 접근하는 방법
var obj2 = {
    a : 10,
    name : '홍길동',
    fn : function () {
        alert(this.name);
    }
};
obj2.fn();
</script>
```

### Object - for … in
* 반복문으로 키값을 꺼내오는 구문

```html
<script>
var obj = {
    name : 'hivelab',
    site : 'hivelab.co.kr',
    email : 'hivelab@hivelab.co.kr',
    tel : '02-123-4567'
}
for (var key in obj) {
    console.log(key, obj[key]);
}
</script>
```

### Object - delete
* 값을 삭제하는 구문

```html
<script>
var obj = {
    name : 'hivelab',
    site : 'hivelab.co.kr',
    email : 'hivelab@hivelab.co.kr',
    tel : '02-123-4567'
}
console.log(obj.tel);
delete obj.tel
console.log(obj.tel);
</script>
```
