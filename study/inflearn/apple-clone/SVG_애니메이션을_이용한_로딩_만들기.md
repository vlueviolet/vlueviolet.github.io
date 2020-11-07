# SVG 애니메이션을 이용한 로딩 만들기

```html
<div class="loading">
  <svg class="loading-circle">
    <!-- 가운데 위치하며 반지름은 25 -->
    <circle cx="50%" cy="50%" r="25"></circle>
  </svg>
</div>
```

```css
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  opacity: 0;
  transition: 0.5s;
}

.before-load .container {
  /* display: none; */
}

.before-load .loading {
  opacity: 1;
}

@keyframes loading-spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-circle-ani {
  0% {
    stroke-dashoffset: 157;
  }

  75% {
    /* 157이 전체 길이이니까, 거의 끝에 가서 animation 효과를 줌으로 속도의 변화를 주는 효과를 제공 ㄴ*/
    stroke-dashoffset: -147;
  }

  100% {
    stroke-dashoffset: -157;
  }
}

.loading-circle {
  width: 54px;
  height: 54px;
  animation: loading-spin 3s infinite;
}

.loading-circle circle {
  stroke: black;
  stroke-width: 4;
  /* getTotalLength()로 stroke의 길이를 얻어올 수 있음 */
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  fill: transparent;
  animation: loading-circle-ani 1s infinite;
  /* transition: 1s; */
}
```

### svg 길이
```javascript
document.querySelector('.loading-circle circle').getTotalLength();
```
```bash
156.0674285888672
```

### stroke 속성
#### stroke-dasharray
길이가 100인 선이 있다고 가정하자.  
이 선의 `dasharray=25`로하면 아래와 같이 그려진다.  

마치 점선처럼 그려진다.

<img width="190" alt="스크린샷 2020-08-17 오후 5 02 21" src="https://user-images.githubusercontent.com/26196090/90372480-6ebb0080-e0ab-11ea-9691-bc62c1c27d13.png">


#### stroke-dashoffset
이 속성을 이용하면 선을 이동시킬 수 있다.

<img width="370" alt="스크린샷 2020-08-17 오후 5 04 29" src="https://user-images.githubusercontent.com/26196090/90372691-bb9ed700-e0ab-11ea-8821-7fe904cf0739.png">

이 두 속성을 이용해서 애니메이션 효과를 줄 수 있다.

```html
<h4>100</h4>
<svg viewBox="0 0 100 100">
  <line x1="0" y1="10" x2="100" y2="10" stroke-width="4" stroke="black" />
</svg>
<h4>stroke-dasharray="100", stroke-dashoffset="-10"</h4>
<svg viewBox="0 0 100 100">
  <line 
    x1="0" y1="10" x2="100" y2="10" stroke="black"
    stroke-width="4"
    stroke-dasharray="100"
    stroke-dashoffset="-10"
  />
</svg>
<h4>stroke-dasharray="100", stroke-dashoffset="-20"</h4>
<svg viewBox="0 0 100 100">
  <line 
    x1="0" y1="10" x2="100" y2="10" stroke="black"
    stroke-width="4"
    stroke-dasharray="100"
    stroke-dashoffset="-20"
  />
</svg>
<h4>stroke-dasharray="100", stroke-dashoffset="-50"</h4>
<svg viewBox="0 0 100 100">
  <line 
    x1="0" y1="10" x2="100" y2="10" stroke="black"
    stroke-width="4"
    stroke-dasharray="100"
    stroke-dashoffset="-50"
  />
</svg>
```

<img width="385" alt="스크린샷 2020-08-17 오후 5 08 27" src="https://user-images.githubusercontent.com/26196090/90373104-64e5cd00-e0ac-11ea-8ecd-6f1f69e558bb.png">


## 페이지에 적용하기

페이지 load 이후에 클래스를 제어해서 loading을 화면에서 사라지게 한다.

```javascript
window.addEventListener('load', () => {
  document.body.classList.remove('before-load');
  // .. 중략
});
```

layer 형태로 되어있기때문에 해당 코드를 `display: none` 또는 `removeChild` 해줘야하나,  
그렇게되면 trasition 효과가 없어지기 때문에 css event인 `transitionend`를 활용한다.

```javascript
document.querySelector('.loading').addEventListener('transitionend', (e) => {
  document.body.removeChild(e.currentTarget);
});
```