# Transformations (변환)
- css의 tranform이라고 생각하면 됨, 더 까다롭지만.
- https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/%EB%B3%80%ED%98%95

---

## 상태 저장(save), 복원(restore)
- save : canvas의 모든 상태를 저장
- restore : 가장 최근에 저장된 canvas 상태를 복원

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.fillRect(100, 100, 200, 200);
context.fillStyle = 'orange';
context.fillRect(150, 150, 200, 200);

/** save()
  * canvas의 모든 상태 저장
  */
context.save();

// blue
context.fillStyle='blue';
context.beginPath();
context.arc(300, 300, 50, 0, Math.PI*2, false);
context.fill();

/** restore()
  * 가장 최근에 save한 canvas 상태 복원
  * orange 사각형 시점의 canvas가 나옴ㄴ
  */
context.restore();

context.beginPath();
context.arc(300, 300, 20, 0, Math.PI*2, false);
context.fill();
```

<img width="330" alt="스크린샷 2020-06-14 오후 3 11 18" src="https://user-images.githubusercontent.com/26196090/84586106-52071000-ae51-11ea-98c9-ae759e368529.png">

### save, restore의 사용
save, restore는 stack과 같은 개념인것 같다.  
save를 save(context1) → save(context2) → save(context3) 순으로 했다면,  
restore는 restore(context3) → restore(context2) → restore(context1) 순으로 가능하다.

```javascript
var ctx = document.getElementById('canvas').getContext('2d');

// rect-1
ctx.fillRect(0, 0, 150, 150);   // 기본 설정으로 사각형을 그리기
ctx.save();                     // 기본 상태를 저장하기

// rect-2
ctx.fillStyle = '#09F';         // 설정 변경하기
ctx.fillRect(15, 15, 120, 120); // 새로운 설정으로 사각형 그리기
ctx.save();                  // 현재 상태 저장하기

// rect-3
ctx.fillStyle = '#FFF';      // 설정 변경하기
ctx.globalAlpha = 0.5; 
ctx.fillRect(30, 30, 90, 90);   // 새로운 설정으로 사각형 그리기

// rect-4
ctx.restore();               // 이전 상태 복원하기, 가장 최신의 것이기 때문에 rect-2의 상태가 복원된다.
ctx.fillRect(45, 45, 60, 60);   // 복원된 설정으로 사각형 그리기

// rect-5
ctx.restore();               // 초기 상태를 복원하기, rect-2 이전의 save 단계인 rect-1이 복원된다.
ctx.fillRect(60, 60, 30, 30);   // 복원된 설정으로 사각형 그리기
```

<img width="173" alt="스크린샷 2020-06-14 오후 3 15 39" src="https://user-images.githubusercontent.com/26196090/84586152-ec675380-ae51-11ea-8100-58727e8888f7.png">

---

## scale
scale을 이용해 점점 커지는 사각형 애니메이션을 만들어보자.
```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const draw = () => {
  context.strokeRect(300, 300, 100, 100);
  context.scale(1.01, 1.01);
  requestAnimationFrame(draw);
};

draw();
```

css의 transform처럼, 현재 위치에서 늘어나는 것이 아니라, 좌표값도 바뀌면서 커지고 있다.  
canvas는 css만큼 고수준의 표현을 하지 않기때문에, 이전 상태의 좌표도 작업자가 일일히 지정해줘야 한다.

![Jun-14-2020 15-34-38](https://user-images.githubusercontent.com/26196090/84586687-97790c80-ae54-11ea-95db-383e7f67184b.gif)

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let scaleValue = 1;

const draw = () => {
  // 이전에 그린 사각형 지우기 (canvas 범위 전체)
  // save, restore가 없다면, (0, 0)은 (350, 350)부터 캔버스 나머지 영역까지만 clearRect하게 될 것이다.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 현재 상태 저장
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);

  // 기준점이 (0, 0) → (350, 350) 위치로 이동됨
  context.translate(350, 350);

  // 크기 지정
  context.scale(scaleValue, scaleValue);

  // 크기 증가
  scaleValue += 0.01;

  // stroke 사각형 그리기
  context.strokeRect(-50, -50, 100, 100);

  // 최근에 저장한 canvas 상태 복원, clearRect를 복원하기 위함이다.
  context.restore();
  
  requestAnimationFrame(draw);
};

draw();
```

![Jun-14-2020 15-57-25](https://user-images.githubusercontent.com/26196090/84587160-c8a70c00-ae57-11ea-9e88-e14264078f50.gif)


### save, restore가 없다면?
만약, 위 코드에서 `save`, `restore`가 없다면,  
기준점이 (0, 0) → (350, 350)로 옮겨졌기때문에,

```javascript
context.translate(350, 350);
```

clearRect는 (350, 350) 기준으로 캔버스 크기만큼의 영역을 지우게 된다.

```javascript
context.clearRect(0, 0, canvas.width, canvas.height);
```

<img width="400" alt="스크린샷 2020-06-14 오후 3 54 19" src="https://user-images.githubusercontent.com/26196090/84587104-53d3d200-ae57-11ea-8086-5f2693ee4a98.png">


물론, 기준점을 초기화 하기 위해 이렇게 해도 된다.

```javascript
context.translate(-350, -350);
```

하지만, 기준점 뿐 아니라 다른 영향을 줄 수 있다.  
하위에 작은 사각형을 그리는 코드가 있다고 가정해보자.
사각형을 그리려고 한것 뿐인데, 위치 분 아니라 scale의 영향도 받게된다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let scaleValue = 1;

const draw = () => {
  // 이전에 그린 사각형 지우기 (canvas 범위 전체)
  // save, restore가 없다면, (0, 0)은 (350, 350)부터 캔버스 나머지 영역까지만 clearRect하게 될 것이다.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 현재 상태 저장
  // context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);

  // 기준점이 (0, 0) → (350, 350) 위치로 이동됨
  context.translate(350, 350);

  // 크기 지정
  context.scale(scaleValue, scaleValue);

  // 크기 증가
  scaleValue += 0.01;

  // stroke 사각형 그리기
  context.strokeRect(-50, -50, 100, 100);

  // 최근에 저장한 canvas 상태 복원, clearRect를 복원하기 위함이다.
  // context.restore();
  
  context.fillRect(10, 10, 30, 30);
  
  requestAnimationFrame(draw);
};

draw();
```

이전 상태의 영향을 받아, (10, 10) 위치에 그려지지 않을 뿐만 아니라, scale의 영향도 받게 된다.

![Jun-14-2020 16-09-37](https://user-images.githubusercontent.com/26196090/84587355-7c5ccb80-ae59-11ea-8024-775af07342c8.gif)

---

## rotate
각도는 radian을 기준으로 한다.

```
360° = 2π
1° = 1/180π
```

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let scaleValue = 1;
let rotationValue = 0;

const toRadian = (d) => {
  return d * Math.PI / 180;
};

const draw = () => {
  // 이전에 그린 사각형 지우기 (canvas 범위 전체)
  // save, restore가 없다면, (0, 0)은 (350, 350)부터 캔버스 나머지 영역까지만 clearRect하게 될 것이다.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 현재 상태 저장
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);

  // 기준점이 (0, 0) → (350, 350) 위치로 이동됨
  context.translate(350, 350);

  // 크기 지정
  context.scale(scaleValue, scaleValue);

  // 각도 변경
  context.rotate(toRadian(rotationValue));
  
  // stroke 사각형 그리기
  context.strokeRect(-50, -50, 100, 100);
  
  // 최근에 저장한 canvas 상태 복원, clearRect를 복원하기 위함이다.
  context.restore();
  
  // 크기 증가
  // scaleValue += 0.05;
  rotationValue += 1;
  
  context.fillRect(10, 10, 30, 30);
  
  requestAnimationFrame(draw);
};

draw();
```

![Jun-14-2020 16-31-20](https://user-images.githubusercontent.com/26196090/84587710-8fbd6600-ae5c-11ea-9fe7-d73a52592c5b.gif)


`clearRect`를 하지 않을때, 의외의 멋진 효과가 나오기도 한다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let scaleValue = 1;
let rotationValue = 0;

const toRadian = (d) => {
  return d * Math.PI / 180;
};

const draw = () => {
  // 이전에 그린 사각형 지우기 (canvas 범위 전체)
  // save, restore가 없다면, (0, 0)은 (350, 350)부터 캔버스 나머지 영역까지만 clearRect하게 될 것이다.
  // context.clearRect(0, 0, canvas.width, canvas.height);

  // 현재 상태 저장
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);

  // 기준점이 (0, 0) → (350, 350) 위치로 이동됨
  context.translate(350, 350);

  // 크기 지정
  context.scale(scaleValue, scaleValue);

  // 각도 변경
  context.rotate(toRadian(rotationValue));
  
  // stroke 사각형 그리기
  context.strokeRect(-50, -50, 100, 100);
  
  // 최근에 저장한 canvas 상태 복원, clearRect를 복원하기 위함이다.
  context.restore();
  
  // 크기 증가
  scaleValue += 0.05;
  rotationValue += 1;
  
  context.fillRect(10, 10, 30, 30);
  
  requestAnimationFrame(draw);
};

draw();
```

![Jun-14-2020 16-32-55](https://user-images.githubusercontent.com/26196090/84587734-cbf0c680-ae5c-11ea-9773-25f0781e9e5e.gif)

---

## setTransform(a, b, c, d, e, f)
변환을 초기화 한다.  
`resetTransform()`를 사용해도 된다.  

canvas로 변환을 다루다보면, 복잡한 표현을 하게되는데,  
단위행렬을 이용해서 변환을 다룬다.

단위행렬을 사용하면 더 많은 표현을 할 수 있다.  
(이런것들)[https://studiomeal-717af.firebaseapp.com/]

즉, `단위행렬 * n차 행렬 = n차 행렬`의 결과가 나오도록 하는게 단위행렬이다.

`setTransform()`를 하지않으면, 이런 결과가 나온다.  
회전하는 사각형 외에 왼쪽 상단에 작은 사각형을 그리려고 한다.  
하지만, 회전의 영향을 같이 받고 있다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let scaleValue = 1;
let rotationValue = 0;

const toRadian = (d) => {
  return d * Math.PI / 180;
};

const draw = () => {
  // 현재 상태 저장
  context.save();

  // 기준점이 (0, 0) → (350, 350) 위치로 이동됨
  context.translate(350, 350);

  // 크기 지정
  context.scale(scaleValue, scaleValue);

  // 각도 변경
  context.rotate(toRadian(rotationValue));
  
  // stroke 사각형 그리기
  context.strokeRect(-50, -50, 100, 100);

  // context.setTransform(1, 0, 0, 1, 0, 0);

  // 왼쪽 상단에 사각형 그리기
  context.fillRect(10, 10, 30, 30);
  
  // 최근에 저장한 canvas 상태 복원, clearRect를 복원하기 위함이다.
  context.restore();
  
  // 크기 증가
  scaleValue += 0.05;
  rotationValue += 1;
  
  requestAnimationFrame(draw);
};

draw();
```

![Jun-14-2020 16-54-13](https://user-images.githubusercontent.com/26196090/84588132-b204b300-ae5f-11ea-9949-368900057cab.gif)

이때, `setTransform`, `resetTransform`를 사용하면 초기화 된다.
또는 `restore()` 이후에 `fillRect()`를 하면된다.

```javascript
context.setTransform(1, 0, 0, 1, 0, 0);
context.resetTransform();
```

`setTransform(1,0,0,1,0,0)`, `resetTransform`이든 변환을 사용할때는  
반드시, `변환 초기화 → 변환`하는 습관을 들이자.