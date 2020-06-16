# canvas
- canvas는 비트맵 방식으로 표현된다. (svg는 벡터)
- 애니메이션을 구현한다고 했을때, 각 프레임을 그리고, 다시 그리고, 지우고를 반복 즉 수작업으로 그렸던 과거 애니메이션 방식과 같은 방식으로 구현된다.
- 모든 값을 작업자가 구현해야하는 단점이 있다. 코딩양이 많고, 원 1개를 그리더라도 코딩 양이 많다.
- 하지만, 일반 웹에서 표현할 수 없는 많은 표현을 가능하게 한다.

## 기본 선언

canvas의 모든 작업은 `context`를 통해 가능하다.  
canvas 객체를 가져와 `getContext` 메소드를 통해 return된 `context` 객체를 이용하는 것이다.  

이는 default라고 보면 된다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
```

## canvas의 실행
canvas는 도화지에 붓으로 표현한다고 보면 된다.  
아래는 사각형을 그리는데, 컬러를 변경하고 있다.

일반적인 javascript라면, 1개의 오렌지색 사각형이 나올것이라 생각할 수 있지만,  
canvas는 도화지 개념이기 때문에 검은색, 오렌지색 2개의 사각형이 표현된다.

이렇게 보면된다.  
- canvas 객체를 생성한다.
- x, y가 (100, 100)인 위치에 200x200 사각형을 그린다. (컬러 지정이 없다면, 기본은 `#000`)
- 붓의 컬러를 orange로 바꾼다.
- x, y가 (150, 150)인 위치에 200x200 사각형을 그린다. 컬러는 오렌지색이다.

```javascript
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

context.fillRect(100, 100, 200, 200);
context.fillStyle = 'orange';
context.fillRect(150, 150, 200, 200);
```

<img width="308" alt="스크린샷 2020-06-14 오후 3 05 05" src="https://user-images.githubusercontent.com/26196090/84586013-77474e80-ae50-11ea-8ff7-5fd9229d2d34.png">


## requestAnimationFrame vs setInterval

## beginPath, closePath

무엇이든 그릴때는 반드시 `beginPath()`를 선언하고,  
다 그렸다면 `closePath()`를 선언해야한다.  

그렇지않으면, 포토샵에서 점-점을 찍으면 선이 연결되는 듯한 표현이 되어  
의도하지 않은 모양이 나올 수 있다.  

closPath는 생략할 수 있지만, beginPath를 반드시 작성하자.

## alpha 적용
alpha를 적용하는 방법은 2가지가 있다.  

- context.fillStyle='rgba(0, 0, 0, .5)';
- context.globalAlpha = 0.5;

`globalAlpha`은 전체 context에 적용되기 때문에, 다른 alpha로 하려면 다시 초기화 해줘야 한다. 성능에도 영향을 줄 수 있다.  
`fillStyle`은 해당 style에서만 적용된다.

## 함수 설명
### drawImage()
이미지 그리는 함수  

`canvas`로 canvas, image, video 요소를 그릴 수 있는데,  
`requestAnimationFrame`함수와 결합하여 frame 단위로 그릴 수 있다.

```javascript
context.drawImage(obj, sx, sy, swidth, sheight, dx, dy, dWidth, dHeight);
```
#### 파라메터 설명
`*` (필수입력)
- obj(*) : canvas로 그리려는 대상 (canvas, img, video)
- sx(*) : 출력할 대상의 x 좌표
- sy(*) : 출력할 대상의 y 좌표
- sWidth : 이미지 width / 원본(source) 잘라낼 영역(clipping rectangle)
- sHeight :  이미지 Height / 원본(source) 잘라낼 영역(clipping rectangle)
- dx : 만약 잘라내었다면, 대상 이미지의 X좌표
- dy : 만약 잘라내었다면, 대상 이미지의 Y좌표
- dWidth : 만약 잘라내었다면, 대상 이미지의 width
- dHeight : 만약 잘라내었다면, 대상 이미지의 Height

#### 활용
비디오가 재생가능한 준비(canplaythrough)가 되면, 이미지를 그리도록 하는 코드

```javascript
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

ctx.textAlign = 'center';
ctx.fillText('비디오 로딩 중..', 300, 200);

videoElem.addEventListener('canplaythrough', render);

// video 요소를 가져와서 1/60 frame 단위로 그리는 함수로 사용
function render() {
  ctx.drawImage(videoElem, 0, 0, 600, 400);
  requestAnimationFrame(render);
}
```

### getImageData()

```javascript
context.getImageData(x, y, width, height);
```

## 참고사항
### canplaythrough
canplay 이벤트와 동일하지만, 차이점은 전체 미디어가 중단없이 재생할 수 있을 때 호출된다.  
canplay 이벤트가 전체 재생을 보장하지는 못하였다면, canplaythrough 는 중단없이 전체 재생을 보장하는 목적이다.  

현재 로드 속도를 유지한다고 가정하고, 중단이 되지 않는다고 판단하면 호출된다.  

**하지만 이것 또한 가정이기때문에, canplay 이벤트보다는 전체 재생을 보장하겠지만, 확신할 수는 없다.**  

그리고 다른 면에서 조금 더 생각해보면, canplaythrough 이벤트는 canplay 이벤트가 일어난 후에 호출된다.  

```
결과적으로 순서는 loadedmetadata -> loadeddata -> canplay -> canplaythrough 를 의미할 수 있다.
```


출처: https://mygumi.tistory.com/356 [마이구미의 HelloWorld]
