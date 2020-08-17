## 스크롤로 비디오 제어하기

### video 요소를 이용
video로 처리하는 경우, 비디오 용량에 영향을 받게 된다.  
대부분 예제로 사용하는 영상들은 화질이 낮아 잘 동작하지만, 고화질일 수록 버벅거리는 경우가 많기 때문에  
video 요소를 이용한 영상 제어는 적합하지 않다.

#### loadeddata 이벤트
- 비디오 로드가 완료된 상태
- 같이 자주 쓰는 이벤트가 `canplaythrough`가 있는데 비디오의 재생시간을 조정할때마다 발생하기때문에 한번 깔끔하게 쓰려면 `loadeddata`가 적합하다.

```javascript
videoElem.addEventListener('loadeddata', () => {
  console.log('비디오 로드 완료');
  videoDuration = videoElem.duration; // video 전체 재생시간
  init();
});
```

```javascript
const videoElem = document.querySelector('.sample-video');
let progress;
let ㅇ;

videoElem.addEventListener('loadeddata', () => {
  console.log('비디오 로드 완료');
  videoDuration = videoElem.duration;
  init();
});

const init = () => {
  document.body.classList.remove('before-load');
  window.addEventListener('scroll', function () {
    // 전체 페이지 중에 현재 스크롤이 얼만큼 진행되었는지의 %
    progress = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    console.log(progress);
    
    // 모바일 바운스 대비해서 범위 내로 들어오도록 조정
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    videoElem.currentTime = videoDuration * progress;
  });
};
```

process 부연 설명

<img width="768" alt="스크린샷 2020-07-12 오후 1 22 51" src="https://user-images.githubusercontent.com/26196090/87238954-4d2f7f00-c444-11ea-8a58-15f0de7ecfbf.png">


### Image를 이용
60fps의 이미지 시퀀스를 이용하는 방법으로 애플도 유사 방식을 쓴다고 함

```javascript
const imgElem = document.querySelector('.sample-img');
const videoImages = [];
let loadedImagesCount = 0;
let totalImagesCount = 960;
let progress;
let currentFrame;

const setImages = () => {
  for (let i = 0; i < totalImagesCount; i++) {
    let imgElem = new Image();
    imgElem.src = `../video/002/IMG_${7027 + i}.JPG`;
    videoImages.push(imgElem);
  }
}

const init = () => {
  document.body.classList.remove('before-load');

  window.addEventListener('scroll', function () {
    progress = pageYOffset / (document.body.offsetHeight - window.innerHeight);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    requestAnimationFrame(function () {
      // 반올림해서 정수가 나오도록 조정, index는 0부터 시작이므로 -1
      currentFrame = Math.round((totalImagesCount - 1) * progress);
      imgElem.src = videoImages[currentFrame].src;
    });
  });
}

window.addEventListener('load', init);  // 문서에서 사용하는 asset load
setImages();
```

#### 이미지를 많이 쓰면 용량 이슈 없을까?  
비디오 대비 용량이 적지만, 이미지 활용시 최적화를 해주는 것이 좋다.

#### 이미지 추출하려면?
구글에서 '동영상 프레임 추출' 검색해보기

### canvas를 이용하는 방식
- 애플에서 사용하는 방식
- 수백장의 이미지를 canvas로 그리는 방식
```javascript
const canvas = document.querySelector('.sample-canvas');
const context = canvas.getContext('2d');
const videoImages = [];
let totalImagesCount = 960;
let progress;
let currentFrame;

function setImages() {
  for (let i = 0; i < totalImagesCount; i++) {
    let imgElem = new Image();
    imgElem.src = `../video/002/IMG_${7027 + i}.JPG`;
    videoImages.push(imgElem);
  }
}

function init() {
  document.body.classList.remove('before-load');
  // 로딩시 canvas에 그려서 화면에 보여주기 위함
  context.drawImage(videoImages[0], 0, 0);

  window.addEventListener('scroll', function () {
    progress = pageYOffset / (document.body.offsetHeight - window.innerHeight);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    currentFrame = Math.round((totalImagesCount - 1) * progress);
    context.drawImage(videoImages[currentFrame], 0, 0);
  });
}

window.addEventListener('load', init);
setImages();
```


#### canvas 사이즈를 조정하는 방법
1. javascript로 하는 방법
2. css scale을 이용하는 방법
  ```css
  .sticky-elem-canvas canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  ```
  ```javascript
  const heightRatio = window.innerHeight / 1080; // canvas 높이 대비 window의 높이
  sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  ```


### 블랜딩 캔버스 크키 계산
원래 캔버스의 비율과 현재 브라우저의 비율을 비교해서 화면에 보이는 캔버스 크기를 조정해줘야 한다.  
이는 브라우저보다 넘치는 영역을 crop하는 것이 아닌, 브라우저 비율에 맞게 캔버스를 꽉 차게 조절하기 위함이다.

```javascript
const widthRatio = window.innerWidth / objs.canvas.width;
const heightRatio = window.innerHeight / objs.canvas.height;
let canvasScaleRatio; // 적용할 canvas의 비율

if (widthRatio <= heightRatio) {
  // 캔버스보다 브라우저 창이 홀쭉한 경우
  canvasScaleRatio = heightRatio;
} else {
  // 캔버스보다 브라우저 창이 납작한 경우
  canvasScaleRatio = widthRatio;
}
```

### 좌우 흰색 영역 계산 원리
예시 이미지와 같이 이미지의 scale 변화되는 인터랙션은 실제 이미지의 크기를 제어하기보다  
좌우 흰색 box의 위치를 이동시켜서 마치 scale이 바뀌는 효과를 낼 수 있다.

![Jul-26-2020 16-28-53](https://user-images.githubusercontent.com/26196090/88473935-26ea0300-cf5d-11ea-9800-d91a183b634f.gif)

(reference : https://www.apple.com/macbook-pro-16/)


- `div`를 좌우에 배치에서 이동하는 방법 (apple)
- `canvas`에서 흰색 박스를 그려주는 방법 (강의)
    DOM에서 제어하기보다 canvas 처리하는것이 성능상 좋다.

#### canvas를 이용한 배경 scale 조정
canvas의 경우, 브라우저 비율에 따라 조정되기때문에 아래와 같이 화면 밖으로 crop되는 경우가 있을 것이다.  
그렇기 때문에 box의 위치는 브라우저 양 끝에 위치해야한다.

<img width="536" alt="스크린샷 2020-07-26 오후 4 45 27" src="https://user-images.githubusercontent.com/26196090/88474233-6d406180-cf5f-11ea-9281-38ee5260e085.png">

```javascript
// 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
const widthRatio = window.innerWidth / objs.canvas.width;
const heightRatio = window.innerHeight / objs.canvas.height;
let canvasScaleRatio;

if (widthRatio <= heightRatio) {
  // 캔버스보다 브라우저 창이 홀쭉한 경우
  canvasScaleRatio = heightRatio;
} else {
  // 캔버스보다 브라우저 창이 납작한 경우
  canvasScaleRatio = widthRatio;
}

// 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio; // document.body.offsetWidth를 쓴 이유는, scrollbar를 제외한 영역을 구하기 위함
const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
```

canvas에 그려질 box의 초기 위치값을 구해보자.  

```javascript
const whiteRectWidth = recalculatedInnerWidth * 0.15; // 15% 너비
// 왼쪽 박스
values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2; // 전체 canvas.width에서 재계산된 canvas 너비를 빼면, crop된 전체 canvas의 짜투리 영역만 남는다. 그 너비의 50%로하면, 왼쪽 박스의 초기 x 위치값이 나온다.
values.rect1X[1] = values.rect1X[0] - whiteRectWidth; // animation이 끝나는 최종값, 초기값인 [0] - box1 너비를 뺸 값
// 오른쪽 박스
values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth; // rect1X[0]과 재계산된 canvas 너비를 더한 위치에서 자신의 너비를 뺀 값이 animation 시작 위치이다.
values.rect2X[1] = values.rect2X[0] + whiteRectWidth; // rect2X[0] 초기 위치에서 자신의 너비를 더하면, animation이 끝나는 위치를 구할 수 있다.
```  

이미지로 보면 다음과 같다.  
<img width="622" alt="스크린샷 2020-07-26 오후 5 42 52" src="https://user-images.githubusercontent.com/26196090/88475057-7af9e500-cf67-11ea-9f4b-b21a334b4ff3.png">


#### 스크롤시 canvas의 scale 애니메이션이 canvas가 화면 위에 붙었을때까지 알맞게 구현되도록 하기
그러려면, 이미지와 같이 x값을 알아야 한다.  
<img width="422" alt="스크린샷 2020-07-26 오후 6 51 36" src="https://user-images.githubusercontent.com/26196090/88476141-0cba2000-cf71-11ea-9839-d8179cd02919.png">

##### 방법 1) getBoundingClientRect을 이용
이 값은 `getBoundingClientRect`를 이용하면, 화면상의 해당 object의 크기와 위치값을 알 수 있다.  
(기준은 화면 기준이다.)

```javascript
objs.canvas.getBoundingClientRect().top;
```

```javascript
// common.js
const sceneInfo = [
  // ...생략
  {
    values: {
      rect1X: [0, 0, { start: 0, end: 0 }],
      rect2X: [0, 0, { start: 0, end: 0 }],
      rectStartY: 0
    }
  }
];

if (!values.rectStartY) {
  values.rectStartY = objs.canvas.getBoundingClientRect().top;
  values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;  // 창 사이즈의 절반정도에서 시작되도록
  values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
  values.rect1X[2].end = values.rectStartY / scrollHeight;
  values.rect2X[2].end = values.rectStartY / scrollHeight;
}
```

하지만, 스크롤 강도(속도)에 따라 scale이 일정하게 맞아 떨어지지 않는다.

![Jul-26-2020 19-13-02](https://user-images.githubusercontent.com/26196090/88476539-11340800-cf74-11ea-9b76-42b47746bebe.gif)

```
getBoundingClientRect은 브라우저(화면)을 기준으로 object의 위치값을 가져오기때문에,  
스크롤에 따라 다른 값을 가져와 scale 애니메이션에서 사용하기 어렵다.
```

다른 방법을 찾아보자.

##### 방법 2) offsetTop을 이용

`offsetTop`은 document 상단을 기준으로 값을 가져오기때문에, scroll 강도에 영향을 받지 않고, 일정한 값을 출력한다.  

```javascript
if (!values.rectStartY) {
  // values.rectStartY = objs.canvas.getBoundingClientRect().top;
  values.rectStartY = objs.canvas.offsetTop;
  console.log('values.rectStartY', values.rectStartY);
  values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
  values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
  values.rect1X[2].end = values.rectStartY / scrollHeight;
  values.rect2X[2].end = values.rectStartY / scrollHeight;
}
```
<img width="800" alt="스크린샷 2020-07-26 오후 7 32 44" src="https://user-images.githubusercontent.com/26196090/88476885-cb2c7380-cf76-11ea-963f-e4d4ee79046f.png">

하지만, 현재 필요한 값은 document 기준이 아닌  
canvas가 속해있는 section의 상단으로부터 현재 canvas까지의 거리가 필요하다.
`offsetTop`은 기준을 바꿔서 출력할 수 있는데, 이는 css의 `positon`을 이용하여 canvas의 기준으로 부모 section으로 바꿔주면 된다.

```css
.scroll-section {
  position: relative;
  padding-top: 50vh;
}
```

```javascript
console.log('values.rectStartY', values.rectStartY);
```
<img width="800" alt="스크린샷 2020-07-26 오후 7 35 37" src="https://user-images.githubusercontent.com/26196090/88476967-42620780-cf77-11ea-9988-7654df5ab0de.png">

offsetTop을 이용하면, 일정한 값을 가져오지만, 애니메이션 동작이 상이하다.  

![Jul-26-2020 19-13-02](https://user-images.githubusercontent.com/26196090/88476539-11340800-cf74-11ea-9b76-42b47746bebe.gif)

왜냐하면, canvas가 원래 사이즈가 아닌 scale이 조정된 사이즈인데,  
offsetTop은 이를 고려하지않고 원래 canvas 사이즈대로 적용하기 때문이다.  

즉, 조정된 canvas 사이즈에 맞게 offsetTop도 조정이 되어야 한다.

<img width="559" alt="스크린샷 2020-07-26 오후 7 52 42" src="https://user-images.githubusercontent.com/26196090/88477265-979f1880-cf79-11ea-8399-440ededdaf17.png">

단순하게 본다면, 아래와 같은 식이 나온다.

```
조정된 offstTop = 원래 offsetTop + (원래 canavas.height - 조정 canvas.height) / 2;
```

이를 javascript로하면,

```javascript
values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
```


## 부드러운 감속의 원리
이미지 시퀀스, object 이동 등 Mac의 가속도 스크롤이 적용된것 같은 자연스러운 감속을 적용하는 수식

```javascript
let acc = 0.1;
let delayedYOffset = 0;

function loop() {
  delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;
  requestAnimationFrame(loop); 
}
```

원리는, 처음엔 빠르게 → 나중엔 느리게 동작 시키는 것이다.  
이동하는 과정을 통해 수식의 원리를 알아보자.  

시작 위치(c)부터 목표 위치까지 10%씩 이동한다고 가정해보자.

c1 위치는 다음과 같이 구할 수 있다.

전체 구간에서 현재 위치까지의 거리를 뺀 값에서 10%(acc)를 곱하면,  
이동하고자하는 거리가 나온다.

<img width="789" alt="스크린샷 2020-07-26 오후 3 01 59" src="https://user-images.githubusercontent.com/26196090/88472726-f9975800-cf50-11ea-894e-fe57e4ec8b33.png">


```
c1 = (d - c) * acc
```
다시 생각해보면,  
초기 위치(c)에서 위 값을 더한 위치이기 때문에, 수식은 이렇게 정리할 수 있다.

```
c1 = c + (d - c) * acc
```

c2의 위치는 다음과 같이 구할 수 있다.

<img width="783" alt="스크린샷 2020-07-26 오후 3 11 57" src="https://user-images.githubusercontent.com/26196090/88472854-5cd5ba00-cf52-11ea-9255-dd344ef04329.png">


```
c2 = c1 + (d - c1) * acc
```

c3도 마찬가지이다.  
<img width="786" alt="스크린샷 2020-07-26 오후 3 13 24" src="https://user-images.githubusercontent.com/26196090/88472873-90b0df80-cf52-11ea-9bbd-eb6ff41eb839.png">

```
c3 = c2 + (d - c2) * acc
```


### 정리
수식을 다시 정리해보자.

- delayedYOffset: 현재 나의 위치
- pageYOffset: 현재 스크롤 위치

즉, 스크롤바가 위치한 곳(pageYOffset)까지 가기 위해서 object의 위치(delayedYOffset)를 어떻게 변화를 줄 것인지에 대한 수식이라고 보면 된다.

```
delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;
```

### requestAnimationFrame 정리
requestAnimationFrame을 cancel해주기 위해서는, (목표 위치 - 시작 위치)의 차이가 거의 없는지를 통해 제어할 수 있다.  

이 차이를 절대값(`Math.abs()`)을 사용한 이유는,  
아래로 페이지가 이동된다면, `pageYOffset > delayedYOffset`이기 때문에 정상이지만,  
위로 페이지가 이동된다면, `pageYOffset < delayedYOffset`로 음수가 나오게 되어 부드러운 감속이 되지 않는다.  

거리만 판별하면 되기때문에, 절대값을 사용하였다.

```javascript
const box = document.querySelector('.box');
let acc = 0.1;
let delayedYOffset = 0;
let rafId;
let rafState;

function loop() {
  delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;
  box.style.width = `${delayedYOffset}px`;

  rafId = requestAnimationFrame(loop);
  
  if (Math.abs(pageYOffset - delayedYOffset) < 1) { // 둘의 차이가 1보다 작을때
    cancelAnimationFrame(rafId);
    rafState = false;
  } else {
    console.log(pageYOffset +', ' + delayedYOffset);

  }
}

loop();

window.addEventListener('scroll', () => {
  // box.style.width = `${window.pageYOffset}px`;
  console.log('rafState', rafState);
  if (!rafState) {
    rafId = requestAnimationFrame(loop);
    rafState = true;
  }
});
```

## 2번이 끝나갈때, 3번이 시작되기 전에 처리
머그잔이 애니메이션이 거의 끝나갈때 scale 되는 캔버스가 나타나야하는데,  
아직 currentScene이 2이기 때문에 캔버스가 나타나지 않다가  
갑자기 노출되는 어색함을 없애주기 위함

`case 2:` 코드 하단에 캔버스를 그려주는 코드를 `case 3:`에서 가져오고, 중복되는 변수들은 scoped를 이용해서 if문 앞에서만 적용되게 한다.
```javascript
if(scrollRatio > 0.9) {
  const objs = sceneInfo[3].objs;
  const values = sceneInfo[3].values;
}
```

scrollRatio > 0.9 이상일때 처리해준다.

```javascript
case 2:
// ... 중략

  // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
  if(scrollRatio > 0.9) {
    // if문 안에서만 3번 scene 변수 제어
    const objs = sceneInfo[3].objs;
    const values = sceneInfo[3].values;
    
    // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
    const widthRatio = window.innerWidth / objs.canvas.width;
    const heightRatio = window.innerHeight / objs.canvas.height;
    let canvasScaleRatio;
    
    ...

  }

  break;
```

## scene 3의 애니메이션 단계별 정리
애니메이션이 복잡해서 단계를 나누고 작업을 해보자.

- 1단계 : 캔버스 상단이 브라우저 끝에 닿기 전
- 2단계 : 캔버스 상단이 브라우저 끝에 닿는 순간과 이미지 블랜드 처리
- 3단계 : 이미지 scale이 줄어들고, scroll에 따라 올라가는 순간

이 단계를 변수로 제어해보자


```javascript
let step = 0;

// ...
if(캔버스가 브라우저 상단에 닿지 않았다면) { // scrollRatio이 애니메이션 끝나는 시점보다 작을때
  step = 1;
  objs.canvas.classList.remove('sticky');
} else { // 닿은 이후
  step = 2;
  // 이미지 블랜드
  objs.canvas.classList.add('sticky');
  if() {
    step = 3; // 2 이후에 동작해야하기 때문
  }
}
```
### 1단계
애니메이션 end 시점이 scrollRatio보다 작을때를 캔버스가 브라우저 상단에 닿기 전이라고 본다.

```javascript
if(scrollRatio < values.rect1X[2].end) {
  step = 1;
  objs.canvas.classList.remove('sticky');
}
```

### 2단계

#### 캔버스 위치 조정
캔버스가 브라우저 상단에 닿는 순간은 sticky 클래스 추가하여 고정한다.
```javascript
if(scrollRatio < values.rect1X[2].end) {
  // ...
} else {
  // 닿는 순간 sticky 클래스를 추가한다.
  objs.canvas.classList.add('sticky');
}
```

하지만, 이미지와 같이 sticky 처리했음에도 캔버스가 상단에 붙지 않는다.  
이유는 scale로 조정이 되어, top 값도 영향을 받기 떄문이다.  

그래서 scale 비율만큼 top값을 조정해줄 필요가 있다.

<img width="1113" alt="스크린샷 2020-08-17 오전 10 50 40" src="https://user-images.githubusercontent.com/26196090/90350289-9abc8e80-e077-11ea-8d1f-3dbe79b1bfd9.png">


sticky 클래스 추가된 후에 top 값을 조정하는 수식을 추가해준다.

이 수식은, 원래 캔버스 사이즈에서 scale로 조정된 캔버스의 사이즈를 빼준 값의 50%를 top값에 반환한다.

```javascript
objs.canvas.classList.add('sticky');
objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
```

#### 이미지 블랜드
이미지 블랜드처리는 시작, 끝 값을 찾아야 한다.
sceneInfo에 value를 추가해서 애니메이션 처리를 해야한다.

이미지를 그리는 y좌표를 sceneInfo에 등록해서  
정확한 시작~끝 사이의 구간 안에서 이미지가 스크롤에 따라 그려지도록 하는 것이다.

이를 calcValue를 이용할 수 있고, 앞에서 계속 해오던 방식이다.  
이전에는 이를 특정 요소의 css 값에 적용했다면,  
지금은 canvas를 그리는 y좌표에 적용해준다.

>  canvas drawImage의 이해
이미지 블랜드를 구현하려면, `drawImage`에 대한 이해가 필요하다.

`drawImage`는 3가지 방식을 제공한다.

### `void ctx.drawImage(image, dx, dy);`
dx, dy 위치에 이미지를 그린다.

### `void ctx.drawImage(image, dx, dy, dWidth, dHeight);`
dx, dy 위치에 dWidth, dHeight 크기의 이미지를 그린다. 즉 이미지 사이즈를 조정하는 옵션이다.

### `void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`
이미지 상의 원하는 위치에서 원하는 크기의 부분을 → s  
캔버스에 원하는 위치와 원하는 크기로 옮겨 그릴 수 있다. → d

- s : source, 원래 그릴 이미지
- d : destination, 그래서 이렇게 그릴거야 하는 캔버스에 실제 그릴 이미지

[canvas drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

