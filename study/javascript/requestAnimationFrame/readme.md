# requestAnimationFrame 사용법
- 강사 : 유준모 개발자 (스튜디오밀)
- [youtube](https://www.youtube.com/watch?v=9XnqDSabFjM&t=3s)

--- 

window 전역 함수.
브라우저가 매번 화면을 그리는데, 변화된 화면을 그릴 준비가 되었을때  
최적화해서 애니메이션을 부드럽게 그려주는 함수이다.

예전에는 setInterval을 사용했었는데,  
`frame` 유실이나 모바일 기기에서 배터리 절약이 안되는 단점이 있어,  
요즘에는 `requestAnimationFrame`이 많이 사용되고 있다.  

대표적으로는 `canvas`에서 많이 사용되는데, 빠르게 애니메이션을 다시 그리는 작업이기 때문이다.
그리고 interactive web 영역에서 많이 사용된다.

```javascript
// window 생략 가능
window.requestAnimationFrame();
```

## 속도
초당 60번의 실행을 **목표**로 한다. (60fps)  
목표로 한다는 의미는, 사용자의 PC나 웹 환경에 영향을 받기때문에  
속도가 달라질 수 있다는 의미이다.

## return
returen되는 id(type number)가 있다.  
이를 활용해서 특정 값 이상일때 액션을 한다거나 하는 활용이 가능하다.

```javascript
let rId = requestAnimationFrame();
console.log(rId);
```

## cancelAnimationFrame
`requestAnimationFrame`를 멈추는 함수

```javascript
let rId = requestAnimationFrame();

window.addEventListener('click', () => {
  cancelAnimationFrame(rId);
});
```

## 기본 활용
주로 반복을 위한 용도로 사용한다.  

반복하고자 하는 함수 안에 `requestAnimationFrame`를 넣어 해당 함수를 넣어주면,  
빠른 속도로 함수가 재실행된다.

```javascript
let yPos = 0;
function render() {
  document.body.innerHTML = yPos;
  yPos += 10;

  requestAnimationFrame(render);
}
```

 
