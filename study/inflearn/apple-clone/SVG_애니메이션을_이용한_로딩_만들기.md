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