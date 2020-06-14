# Video

## 기본 선언

```html
<video class="video" src="../images/video.mp4" autoplay muted loop></video>
```

- autoplay :
  - 로드시 자동실행 옵션
  - chrome에서 소리가 나는 영상은 autoplay가 안됨, `muted`여야만 가능
- muted : 소리 off
- loop : 반복 재생

## canvas에서 video를 왜 쓰나요?
canvas는 기본적으로 pixel 단위로 조작이 가능한데,  
video의 색을 바꾸거나, 잘게 쪼개어 뒤섞는다든지,  
일반 html로 할 수 없는 것들을 canvas로 가능하다.  

이런 특수한 상황을 위해 video를 canvas로 표현한다.

canvas를 video를 그린다는 것은,  
소스가 될 video를 잡아두고, 계속 반복적으로 그려내는 것이다.  

이미지 대신에 video를 그렸다고 보면 된다.  

pixel 단위의 컬러 데이터를 뽑아서 조작이 가능함  

얼굴인식 등을 웹상에서 한다면, canvas로 구현하는게 맞음

video를 재생하는것과 canvas에서 video를 재생하는 것의 성능 차이가 있음
canvas에서 재생하는게 부하가 더 걸리는건가...확인 필요

## video 제어

```javascript
// 비디오를 가져온다.
const videoElem = document.querySelector('.video');
// 재생 준비가 완료되었을때, render()를 실행한다.
videoElem.addEventListener('canplaythrough', render);

function render() {
  // 이미지를 그려주듯이, 대상에 비디오를 넣어준다.
  ctx.drawImage(videoElem, 0, 0, 600, 400);
  requestAnimationFrame(render);
}
```

### canplaythrough 이벤트
비디오가 재생준비가 되었을때 발생함

### drawImage에 넣을 수 있는 것은?
- image
- video
- other canvas

### getImageData()
각 pixel의 색상정보를 담고 있음

```javascript
var imageData = ctx.getImageData(0, 0, 600, 400);
console.log(imageData);
```
![image](https://user-images.githubusercontent.com/26196090/84359751-0b70a600-ac04-11ea-8ed2-603cb7310595.png)

배열의 크기가 96만이다.  
비디오 각 pixel의 색상값이다.  
pixel이 24만개(600 * 400) * 4 = 96만개인데,  
pixel 1개 당 4개(rgba)의 색상 정보를 갖고 있다.

```javascript
var imageData = ctx.getImageData(0, 0, 600, 400);
console.log(imageData.data);
```
영상의 투명은 없기때문에 4번째는 모두 255이다.

![image](https://user-images.githubusercontent.com/26196090/84360391-f1839300-ac04-11ea-9328-6eed5344e730.png)

