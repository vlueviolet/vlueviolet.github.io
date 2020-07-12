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