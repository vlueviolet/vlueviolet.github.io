# canvas
- canvas는 비트맵 방식으로 표현된다. (svg는 벡터)
- 애니메이션을 구현한다고 했을때, 각 프레임을 그리고, 다시 그리고, 지우고를 반복 즉 수작업으로 그렸던 과거 애니메이션 방식과 같은 방식으로 구현된다.
- 모든 값을 작업자가 구현해야하는 단점이 있다. 코딩양이 많고, 원 1개를 그리더라도 코딩 양이 많다.
- 하지만, 일반 웹에서 표현할 수 없는 많은 표현을 가능하게 한다.

## 기본 선언

canvas의 모든 작업은 `context`를 통해 가능하다.  
canvas 객체를 가져와 `getContext` 메소드를 통해 return된 `context` 객체를 이용하는 것이다.  

이는 default라고 보면 된다.

### Syntax
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

<br><br>

## 함수 설명
### drawImage()
이미지 그리는 함수  

`canvas`로 canvas, image, video 요소를 그릴 수 있는데,  
`requestAnimationFrame`함수와 결합하여 frame 단위로 그릴 수 있다.

#### Syntax
```javascript
context.drawImage(obj, sx, sy, swidth, sheight, dx, dy, dWidth, dHeight);
```

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

<br><br>

### getImageData()
이미지를 추출하는 함수.  

이미지는 수많은 픽셀로 구성되어 있다. 이미지를 구성하는 픽셀 정보를 래스터(Raster)라고 하며 이미지 표면에 어떤 그림이 그려져 있는지를 저장한다. 래스터 데이터를 직접 조작하면 그리기 메서드로는 불가능한 섬세한 효과를 낼 수 있다. `getImageData` 메서드로 캔버스에 그려진 이미지의 래스터 데이터를 얻는다.

#### Syntax
```javascript
context.getImageData(x, y, width, height);


```
- x : 이미지의 시작 x좌표
- y : 이미지의 시작 y좌표
- width : 이미지 너비
- height : 이미지 높이

#### return
좌표(x, y)와 폭(width), 높이(height)를 주면 이 영역의 이미지 정보를 가지는 ImageData 객체가 리턴된다.  
이미지 정보를 조작하려면 리턴값을 반드시 대입받아야 한다. `ImageData`객체의 width, height 속성은 너비와 높이값을 가지며 `data`는 래스터 정보이다. 래스터 정보는 한 점당 R,G,B,A 요소 각각에 대해 4바이트씩의 값을 가지며 이런 픽셀 정보가 좌에서 우로, 위에서 아래로 나열된다. 이미지 자체는 2차원의 픽셀 배열이지만 래스터 데이터는 1차원의 픽셀 배열이다.

![image002](https://user-images.githubusercontent.com/26196090/84731887-39276780-afd5-11ea-9956-7170c3b48c76.png)

이렇게 1차원으로 픽셀을 나열해 놓아도 `ImageData` 객체에 폭과 높이에 대한 정보가 있으므로 어디쯤에서 다음줄로 개생되는지 알 수 있다. 예를 들어 폭(width)이 80이면 0~79까지는 1행이고 80 이후부터는 2행이다. 어차피 래스터 데이터는 값 자체를 직접 조작하므로 좌표가 비직관적이어도 상관없다.  

래스터 정보는 캔버스의 출력물에 대한 사본을 뜬 것이며 이후 화면과는 상관없이 독립적으로 조작할 수 있다. **개별 색상 요소의 값을 바꾸거나 교환할 수 있고 주변 픽셀값까지 고려하여 조작하기도 한다.** 다 조정한 후 다음 메서드로 다시 캔버스에 써 넣는다.

> 출처: http://www.soen.kr/html5/html3/3-2-2.htm

<br><br>

### putImageData()
이미지를 주입하는 함수.  
`getImageData`과 세트이다.  

imgData 전체를 x, y 위치에 써 넣는다. imgData 자체에 폭과 높이에 대한 정보가 있으므로 좌상단 좌표만 전달하면 된다. 래스터 데이터의 일부만 복사하려면 4번째 이후의 dx, dy, dw, dh 값으로 원본의 어느 부분을 복사할 것인가를 지정한다. 이 인수 앞에 `d`는 `dirty`라는 뜻인데 **원본에서 달라진 부분, 즉 갱신이 필요한 부분**을 의미한다.

#### syntax
```javascript
putImageData(imgData, x, y, [dx, dy, dw, dh])
```
`*` : 필수입력
- imgData(*) : `getImageData`로 return 받은 객체
- x(*) : 이미지를 놓을 x좌표
- y(*) : 이미지를 놓을 y좌표
- dx : 원본 대비 복사할 시작 x좌표
- dy : 원본 대비 복사할 시작 y좌표
- dw : dx 기준으로 복사할 너비
- dh : dy 기준으로 복사할 높이

캔버스의 이미지를 조작하는 절차는 간단하다.  
`getImageData`로 사본을 뜨고 이 사본을 쪼물딱거려 원하는대로 바꾼 후 다시 `putImageData`로 밀어 넣는 것이다.  
픽셀 데이터를 직접 조작하므로 어떠한 변형도 가능하다.
> 출처: http://www.soen.kr/html5/html3/3-2-2.htm

<br><br>

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

> 출처: https://mygumi.tistory.com/356 [마이구미의 HelloWorld]
