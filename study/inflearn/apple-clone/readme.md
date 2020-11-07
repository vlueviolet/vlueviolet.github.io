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

<br>

---

##  [Reference] canvas drawImage의 이해
이미지 블랜드를 구현하려면, `drawImage`에 대한 이해가 필요하다.

`drawImage`는 3가지 방식을 제공한다.

#### `void ctx.drawImage(image, dx, dy);`
dx, dy 위치에 이미지를 그린다.

#### `void ctx.drawImage(image, dx, dy, dWidth, dHeight);`
dx, dy 위치에 dWidth, dHeight 크기의 이미지를 그린다.  
즉 이미지 사이즈를 조정하는 옵션이다.

#### `void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`
이미지 상의 원하는 위치에서 원하는 크기의 부분을 → s  
캔버스에 원하는 위치와 원하는 크기로 옮겨 그릴 수 있다. → d

- s : source, 원래 그릴 이미지
- d : destination, 그래서 이렇게 그릴거야 하는 캔버스에 실제 그릴 이미지

### reference 
[canvas drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

---

다시 돌아와서,  
이미지 블랜드에서는 이미지의 y좌표, 그려질 이미지 높이 height가 변화를 주면 되는데,  
height 값이 결정되면, y좌표는 canvas.height - height로 처리가 가능하다.

이를 그려주기 위해서 sceneInfo에 값을 추가하자.
```javascript
// common.js

// 3
// ... 중략
values: {
  // ...
  blendHeight: [ 0, 0, { start: 0, end: 0 } ],
  rectStartY: 0
}
```

이 값을 선언했으니, 값을 셋팅하자.

```javascript
// main.js
values.blendHeight[0] = 0; // 블랜드 시작값
values.blendHeight[1] = objs.canvas.height; // 블랜드 최종값
values.blendHeight[2].start = values.rect1X[2].end; // 앞의 회색 canvas의 끝나는 시점이 블랜드 시작 시점이 된다.
values.blendHeight[2].end = values.blendHeight[2].start + 0.2; // end 타이밍 속도는 내 맘대로~, 시작 시점부터 
```

canvas에 그려보자.

```javascript
// 현재 scene에서 얼마나 scroll 되었는지를 반환해준다.
const blendHeight = calcValues(values.blendHeight, currentYOffset);

// s, d가 같은 이유는 canvas와 image의 크기가 동일하기 떄문이다. 계산을 줄이려면, 이렇게 전략적으로 어셋을 셋팅하면 좋다.
objs.context.drawImage(
  objs.images[1],
  0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
  0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
);
```

### 3단계
이미지 블랜드의 scale을 줄이는 단계이다.  
이 시점은, 블랜드가 종료된 시점으로 보면되는데 `values.blendHeight[2].end` 시점보다 더 스크롤을 하는 시점이다.

```javascript
if (scrollRatio > values.blendHeight[2].end) {
  values.canvas_scale[0] = canvasScaleRatio; // 시작값은 canvas 사이즈가 조정된 값
  values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width); // 종료값은 브라우저 너비보다 작게 해주고, 1.5는 임의로 조정한 값임
  values.canvas_scale[2].start = values.blendHeight[2].end;
  values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2; // values.canvas_scale[2].start 이후로 얼마나 재생될지 값인데, 즉 duration임, 이전에 blend 해준것처럼 20% 동일하게 맞춰준다. 그렇다면, 이미지 블랜드 되고 scale이 줄어는 애니메이션이 해당 스크롤 구간의 40%를 차지하게 된다.

  objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
}
```

다음은, sticky를 제거해줘야 한다.  
이 시점은 블랜드 이미지가 축소되고 난 이후이므로, `values.canvas_scale[2].end`를 활용한다.

`values.canvas_scale[2].end > 0`를 넣은 이후는 해당 시점 이전에 실행되는 것을 방지하기 위함이다.  

```javascript
if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
  objs.canvas.classList.remove('sticky');
}
```
sticky 적용을 제거하면, canvas가 사라진다.  
`position: fixed`가 날아가면서 발생하는 이슈이다.  이를 수정하기 위해서 `marginTop`을 이용해 조정해보자.

![Aug-17-2020 12-10-03](https://user-images.githubusercontent.com/26196090/90353947-b5483500-e082-11ea-8add-882f335d5bc9.gif)

`marginTop`은 스크롤이 머문만큼의 값이 들어간다.  

이 값은 아래 구간의 합이라고 볼 수 있다. 이 구간동안 계속 scroll을 했으니...
하지만, 우리는 이미 그 답을 알고 있다. 각 코드를 가져와보면,

- 이미지 블랜드 시킨 구간 : 전체 스크롤의 20% 동안 했음
```javascript
values.blendHeight[2].end = values.blendHeight[2].start + 0.2; // end 타이밍 속도는 내 맘대로~, 시작 시점부터 20% 더해지도록 해보자.
```
- 블랜드 이후, 이미지 scale한 구간 : 그 다음 20% 동안 했음
```javascript
values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2; // values.canvas_scale[2].start 이후로 얼마나 재생될지 값인데, 즉 duration임, 이전에 blend 해준것처럼 20% 동일하게 맞춰준다. 그렇다면, 이미지 블랜드 되고 scale이 줄어는 애니메이션이 해당 스크롤 구간의 40%를 차지하게 된다.
```

위 코드로 정리해볼때, 해당 섹션의 40%동안 스크롤하면서 애니메이션 관련 처리가 들어갔다.  
그래서 `marginTop`은 아래와 같다.

```javascript
if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
  objs.canvas.classList.remove('sticky');
  objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
}
```

`marginTop`을 적용하고, 스크롤을 역방향으로 위로 올려보면, canvas가 사라지는 것을 볼수 있다.  
이유는 `marginTop` 이 필요없는 구간에 적용되었기 때문이다. 즉, 초기화를 안해줬다.
![Aug-17-2020 12-21-17](https://user-images.githubusercontent.com/26196090/90354391-2f2cee00-e084-11ea-85af-95617f81aab6.gif)

이 구간은 아래 영역이며, 블랜드 이미지가 상단에 닿았을때, scale 직접에 실행되는 위치이다.

```javascript
if (scrollRatio > values.blendHeight[2].end) {
  // ...
  objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
  objs.canvas.style.marginTop = 0; // marginTop 초기화
}
```

### canvas caption 구간
이 구간은, canvas 축소가 끝나고 sticky가 제거된 이후에 발생하는 애니메이션을 정의한다.

```javascript
// common.js

// 3
values: {
  // ... 중략
  canvasCaption_opacity: [ 0, 1,  { start: 0, end: 0 }],     // start, end는 js로 조정
  canvasCaption_traslateY: [ 20, 0,  { start: 0, end: 0 }],  // 20% 아래에서 0의 위치로 이동
}
```

### 초기 시점 수정

이미지 로딩 전에 스크롤하면 다음 에러가 발생한다.

<img width="467" alt="스크린샷 2020-08-23 오후 7 08 07" src="https://user-images.githubusercontent.com/26196090/90975977-0620c780-e574-11ea-971a-1ac828e0316d.png">

<img width="953" alt="스크린샷 2020-08-23 오후 7 09 36" src="https://user-images.githubusercontent.com/26196090/90975993-3d8f7400-e574-11ea-9e35-3ec3e4d4e873.png">

`sceneInfo[currentScene].scrollHeight` 값들이 셋팅되기 전에 scroll 이벤트가 발생하며 생긴 버그이다.
scroll, resize 이벤트를 load 이후에 붙여주면 된다.

```javascript
window.addEventListener('load', () => {
  window.addEventListener('scroll', () => {});
  window.addEventListener('resize', () => {});
  window.addEventListener('orientationchange', () => {});
  document.querySelector('.loading').addEventListener('transitionend', (e) => {});
});
```

그리고 굳이 scrollbar가 load 이전에는 생길 필요가 없어서 이를 제어해준다.
`.before-load` 클래스가 있기때문에 여기에 `overflow: hidden`을 적용해준다.

```css
body.before-load {
  overflow: hidden;
}
```

### css 애니메이션 퍼포먼스 향상시키기 : will-change

css 값이 변화하면서 조정되는 속성들에 시각적인 성능 개선을 할 수 있다.

```scss
will-change: transform, opacity;
```

이렇게 값을 설정하면, css의 변화를 브라우저가 미리 대비할 수 있게 해준다.  

아래 링크를 통해 `will-change`에 대한 주의사항을 읽어보자.  
이 속성을 사용하는 목적을 이해하고 남발하지 말자.
[will-change](https://developer.mozilla.org/ko/docs/Web/CSS/will-change)

현재 scene에 해당하는 영역들에만 will-change가 적용되도록 한다.

```scss
#show-scene-0 #scroll-section-0 .sticky-elem,
#show-scene-1 #scroll-section-1 .sticky-elem,
#show-scene-2 #scroll-section-2 .sticky-elem,
#show-scene-3 #scroll-section-3 .sticky-elem {
  display: block;
  will-change: transform, opacity;
}
```

## 버그 수정

### [모바일] 이미지 블렌드 캔버스 동작 이상
맨 끝에서 위로 스크롤 이동시, 이미지 블렌드의 동작이 상이한 경우가 있다.  

`resize`와 `orientationchange` 이벤트를 분리한 이유는,  
iPhone safari에서는 상/하단 메뉴바들이 나타났다 사라졌다하면서 resize 이벤트가 발생하는데,  
이러한 이유로 iOS 기기들에서 발생하는 오류로 `resize` 대신 `orientationchange`로 해결하게 됐다.

이렇게 적용하려면, `resize`의 `rectStartY`도 같이 변경을 해줘야 한다.
3번째 scene에서는 scroll 길이를 미리 정할 수가 없고, screen 사이즈를 js로 가져와 길이를 정해주게 되었는데,  
그 기준을 맞추다보니 `rectStartY`를 초기화 해주었어야 했다.  
이를 if문 앞으로 이동시킨다.

```javascript
// as-is
window.addEventListener('resize', () => {
  if(window.innerWidth > 900) {
    setLayout();
  }
  sceneInfo[3].values.rectStartY = 0; // resize시 값이 갱신되도록 초기화함
});

// to-be
window.addEventListener('resize', () => {
  if(window.innerWidth > 900) {
    setLayout();
    sceneInfo[3].values.rectStartY = 0; // resize시 값이 갱신되도록 초기화함
  }
});
```

### [모바일] orientationchange 동작 버그

가로모드 전환시, 캔버스 레이아웃이 잘 안잡히는 버그가 있다.  
이는 `setLayout`을 한 템포 느리게 실행하는 방법으로 해결해보자.

```javascript
window.addEventListener('orientationchange', () => {
  setTimeout(setLayout, 500)
});
```

### 스크롤 중간에서 새로고침 시, 중간 위치에서 새로고침하면, 아무것도 화면에 나오지 않는다.

![Aug-23-2020 21-08-21](https://user-images.githubusercontent.com/26196090/90977950-cf06e200-e584-11ea-95d9-5b360eb6ac90.gif)

#### [해결방안 1] 스크롤 인터랙션 페이지들의 경우, 새로고침 시에는 강제로 맨 위로 보내서 해결하는 경우가 많다.  
이게 제일 쉬운 방법이긴 하다.  
하지만 애플에서 그렇게 하지 않으니, 이 방법으로 해결하지는 않겠다.

#### [해결방안 2] 초기 로딩시 scroll 이벤트가 실행되도록 한다. (scrollTo)
load 후, 현재 scroll 위치에서 약간의 scroll을 실행시켜 주는 방식이다.

```javascript
let tempYOffset = yOffset; // 현재 스크롤 위치를 저장하는 임시변수
let tempScrollCount = 0; // 스크롤 count 체크

if(yOffset > 0) { // 맨 위에 있을 경우 예외 처리
  let interval = setInterval(() => {
    scrollTo(0, tempYOffset);
    tempYOffset += 2;
    if(tempScrollCount > 10) {
      clearInterval(interval);
    } else {
      tempScrollCount++;
    }
  });
}
```

결과 화면은 아래와 같다.

![Aug-23-2020 22-18-03](https://user-images.githubusercontent.com/26196090/90979208-910ebb80-e58e-11ea-92c8-a7853a2646a4.gif)


### 스크롤 중간에서 새로고침 시 스크롤하면 보이지 말아야 할 콘텐츠들이 보이는 현상이 있다.
"온종일 편한한 맞춤형 손잡이" 위치에서 새로고침했는데, "보통 스크롤" 콘텐츠가 보인다.

![Aug-23-2020 21-19-55](https://user-images.githubusercontent.com/26196090/90978147-6ae51d80-e586-11ea-9d59-c9187ac85082.gif)


#### [해결방안] scrollHeight가 셋팅되기 이전까지 css로 콘텐츠들이 보이지 않게 한다. (display: none)

이 이슈에는 2가지 원인이 있다.

##### 원인1) 새로고침 시에 scroll 이벤트가 발생하지 않기 때문이다.
비디오 이미지가 그려지는 것 자체가 scroll 이벤트가 발생했을때 동작이 되는데,  
새로고침 시에는 scroll 이벤트가 발생하지 않는다. 그래서 화면에 아무것도 보이지 않는다.

##### 원인2) setLayout 이전에 원래의 콘텐츠 사이즈가 적용되기 때문이다.
1~4개의 섹션중, 2번만 보통 scroll 영역이고, 나머지는 해당 구간동안 scroll이 되게끔 하기위해 일정 높이를 잡아줬다. 이 scroll이 되는 동안 sticky-elem들의 변화가 있었다.

```javascript
const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    // 중략...
  }
];
```

그런데, 보통 scroll 영역은 아무 조치를 하지 않고 자기 콘텐츠 높이 만큼을 잡도록 했다.

```
즉, js로 인한 계산된 높이가 적용되기 전에
모든 섹션들이 본연의 콘텐츠 높이만큼 초기에 셋팅이 되기때문에 
0섹션의 높이는 굉장히 작아 1섹션이 0섹션 스크롤 위치만큼 오게 되는 것이다.
```

`load`가 되었을때 `debugger`를 걸면 현상을 알 수 있다.
```javascript
window.addEventListener('load', () => {
  debugger;
  // ...
});
```
![Aug-23-2020 21-33-34](https://user-images.githubusercontent.com/26196090/90978364-5c980100-e588-11ea-83fd-986670b73b5b.gif)


load가 되는 순간의 각 section의 높이를 보면, common.js에서 지정한 값과 차이가 있음을 알 수 있다.
- 0섹션 : 370px
- 1섹션 : 1109px (보통 스크롤)
- 2섹션 : 303px
- 3섹션 : 1543px

`debugger` 다음 실행을 클릭하면, 이제서야 각 section들이 설정된 값으로 셋팅됨을 알 수 있다.

<img width="233" alt="스크린샷 2020-08-23 오후 9 38 25" src="https://user-images.githubusercontent.com/26196090/90978471-26a74c80-e589-11ea-9c7d-55f5f73b23c4.png">

<img width="937" alt="스크린샷 2020-08-23 오후 9 41 09" src="https://user-images.githubusercontent.com/26196090/90978500-5fdfbc80-e589-11ea-851c-fd7c1deb7958.png">


`.before-load`에 style을 적용해준다.
```scss
.before-load .container {
  display: none;
}
```

### resize시 이미지 블렌드 영역 이슈
페이지 실행하면서 창 사이즈를 조절하면, 일분이 캐릭터 좌우 흰 박스가 보이거나, 이미지 블랜드 위치가 상이하게 동작한다.

![Aug-23-2020 22-21-52](https://user-images.githubusercontent.com/26196090/90979290-185c2f00-e58f-11ea-80ad-1d708fd5c552.gif)

일분이 캐릭터 좌우의 흰 박스의 위치나, 이미지 블렌드 시작 위치의 기준이 새로운 scene 진입 시점에 결정이 되는데,
시점 변경이 된 이후에 resize를 하면, 시점을 벗어나지 않는 한 값이 리셋 되지 않기 때문이다.

scene 3에서 만큼은 resize 이벤트가 발생했을 때 scene 3이 시작 직전의 위치로 scroll을 강제로 올려주는 방식으로 해결해보자.

```javascript
window.addEventListener('resize', () => {
  // 중략...

  // scene 3에서 resize시 동작 상이 대응
  if(currentScene === 3 && window.innerWidth > 450) { // 모바일 기기는 이런 경우가 없어 예외처리
    let tempYOffset = yOffset; // 현재 스크롤 위치를 저장하는 임시변수
    let tempScrollCount = 0; // 스크롤 count 체크
    
    if(yOffset > 0) { // 맨 위에 있을 경우 예외 처리
      let interval = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset -= 50;
        if(tempScrollCount > 20) {
          clearInterval(interval);
        } else {
          tempScrollCount++;
        }
      });
    }
  }
});
```

`window.innerWidth > 450` 조건은 모바일 기기에서는 resize가 필요없기 때문이다.  
모바일 기기의 가로모드 대응은 `orientationchange` 이벤트에서 처리되기 때문에 예외처리를 해준 것이다.

### js 셋팅과 무관한 콘텐츠가 들어간 경우

페이지 맨 하단에 정적인 콘텐츠를 추가해보자.

```html
<section class="normal-content">
  <p class="mid-message">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam consequuntur dolore amet eaque rerum. Earum laudantium aliquam, minima iste reprehenderit nihil magni beatae ab animi nobis cumque cum accusantium provident ad iure, reiciendis explicabo saepe deleniti odit consequuntur aspernatur. Quasi corrupti optio mollitia architecto, a reprehenderit nulla autem aut, fugiat ipsam illum esse tenetur nisi. Libero placeat, atque harum eligendi perspiciatis quia nisi? Officia perferendis voluptatem, aperiam maiores corrupti minima modi, sapiente praesentium, fugiat quaerat nihil! Quaerat, ea aliquam veniam ipsum corrupti doloremque explicabo exercitationem, quae, repudiandae eum possimus. Libero repellendus corporis culpa nulla eos nihil consectetur velit maxime odio.</p>
</section>
```

<img width="1169" alt="스크린샷 2020-08-23 오후 10 40 58" src="https://user-images.githubusercontent.com/26196090/90979691-cb2d8c80-e591-11ea-9dbb-571bde24d8f7.png">

currentScene은 4를 가리키면서, 오류가 발생한다. common.js에 없는 4번 객체에 접근하멵서 발생하는 오류이다.  

currentScene이 3이면 더이상 증가하지 않도록 해주면 된다.

```javascript
const scrollLoop = () => {
  // 중략...

  if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene = true;
    if(currentScene < sceneInfo.length - 1) { // sceneInfo의 범위를 제한함
      currentScene++;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }
  // ... 중략...
}
```