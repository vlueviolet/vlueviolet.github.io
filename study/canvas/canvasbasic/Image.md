# HTML5 Canvas
- 강사 : 유준모 (스튜디오밀)
- 링크 : [youtube](https://www.youtube.com/playlist?list=PLe9WXHRkq9p2Yl0z2zskv-FhP5sinISTc)

## Canvas 기본
```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
```

## Image

### 그림판 만들기
클릭한 위치에 원이 생기게 하기

#### click handler의 event 매개변수
`event` 매개변수를 통해 현재 클릭한 위치를 알아내기 위한 값은 어떤 것이 적절할까?
- clientX, clientY : 브라우저 기준으로 (0, 0) 위치를 기준으로 잡는다.
- layerX, layerY : canvas 위치를 기준으로 위치를 잡는다.

![image](https://user-images.githubusercontent.com/26196090/84351226-e2e1af80-abf5-11ea-9f32-9be706b3f809.png)


#### 그린 이미지를 저장하기 (.toDataURL)
- 링크 : [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
```html
<canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않습니다.</canvas>
<div class="result-image"></div>
<button class="save-btn">이미지 저장</button>
```
```javascript
const createImage = () => {
  const url = canvas.toDataURL('image/png');
  const imgElem = new Image();
  imgElem.src = url;
  resultImage.appendChild(imgElem);
};
```

## 전체 코드
```html
<canvas class="canvas" width="600" height="400">이 브라우저는 캔버스를 지원하지 않습니다.</canvas>
<div class="result-image"></div>
<div class="control">
  <button class="color-btn" data-type="color" data-color="black"></button>
  <button class="color-btn" data-type="color" data-color="red"></button>
  <button class="color-btn" data-type="color" data-color="green"></button>
  <button class="color-btn" data-type="color" data-color="blue"></button>
  <button class="image-btn" data-type="image"></button>
</div>
```
```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control');
const saveBtn = document.querySelector('.save-btn');
const resultImage = document.querySelector('.result-image');

let drawingMode = false;
let colorVal = 'black';
let brush = 'color'; // color, image

const imgElem = new Image();
imgElem.src="../images/ilbuni2.png";

const moveHandler = (e) => {
  if(!drawingMode) return;

  switch(brush) {
    case 'color':
      context.beginPath();  // 그리기 시작할때 default 셋팅
      context.arc(e.layerX, e.layerY, 10, 0, Math.PI*2, false);
      context.fill(); // 색 채우기
      break;
    case 'image':
      context.drawImage(imgElem, e.layerX, e.layerY, 50, 50);
      break;
  }
};

const downHandler = (e) => {
  drawingMode = true;
};
const upHandler = () => {
  drawingMode = false;
};

const setColor = (e) => {
  colorVal = e.target.dataset.color;
  brush = e.target.dataset.type;
  context.fillStyle = colorVal;
};

// 이미지 저장하기
const createImage = () => {
  const url = canvas.toDataURL('image/png');
  const imgElem = new Image();
  imgElem.src = url;
  resultImage.appendChild(imgElem);
};

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);
canvas.addEventListener('mouseup', upHandler);
control.addEventListener('click', setColor);
saveBtn.addEventListener('click', createImage);
```