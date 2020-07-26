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