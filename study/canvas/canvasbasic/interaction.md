# interaction

## 해당 도형에만 클릭 이벤트 적용하기

canvas에 그려지는 도형은 별도의 객체로 존재하는 것이 아니다.  
이런 도형들에 이벤트를 주려면 어떻게 해야할까?  

해당 도형을 그릴때 주어진 x, y, width, height를 이용해서  
click event handler 발생시, event 파라메터를 통해  
해당 영역에 클릭이 발생할때를 선별한다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.fillRect(200, 200, 100, 100);

const clickHandler = (e) => {
  const x = e.layerX;
  const y = e.layerY;

  if(x > 200
    && x < 300
    && y > 200
    && y < 300
  ) {
    console.log('click rectangle!');
  }
};
canvas.addEventListener('click', clickHandler);
```

## 랜덤 박스를 배치하고, 클릭 제어하기
```javascript
const  canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const boxes = [];
const mousePos = { x: 0, y: 0 };
let selectedBox;  // 클릭된 box

context.font='bold 30px sans-serif';

class Box {
  constructor(index, x, y, speed) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 100;
    this.height = 100;
    this.draw();
  };

  draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, .5)';
    context.fillRect(this.x, this.y, 100, 100);
    context.fillStyle = '#fff';
    context.fillText(this.index, this.x+30, this.y+30);
  };
}

const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  let box;
  for(let i=0, max=boxes.length ; i<max ; i++) {
    box = boxes[i];
    box.x += box.speed;
    if(box.x > canvas.width) {
      box.x = -box.width;
    }
    box.draw();
  }
  requestAnimationFrame(render);
};

let tempX, tempY, tempSpeed;

for(let i=0, max=10 ; i<max ; i++) {
  tempX = Math.random() * canvas.width * 0.8; // canvas 너비의 80% 이내까지 찍히도록
  tempY = Math.random() * canvas.height * 0.8;
  tempSpeed = Math.random() * 4 + 1;  // 최소 1
  boxes.push(new Box(i, tempX, tempY, tempSpeed));
}

const clickHandler = (e) => {
  mousePos.x = e.layerX;
  mousePos.y = e.layerY;

  for(let i=0, max=10 ; i<max ; i++) {
    box = boxes[i];
    if(
      mousePos.x > box.x
      && mousePos.x < box.x+box.width
      && mousePos.y > box.y
      && mousePos.y < box.y+box.height
    ) {
      selectedBox = box;
    }
  }
  if(selectedBox) {
    console.log(selectedBox.index);
    selectedBox = null;
  }
};

canvas.addEventListener('click', clickHandler);
render();
```

![Jun-14-2020 22-11-33](https://user-images.githubusercontent.com/26196090/84594259-0c1b6d80-ae8c-11ea-8965-c8c506a905cf.gif)