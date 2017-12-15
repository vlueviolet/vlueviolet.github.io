### Skrollr
* Parallax 효과를 주는 플러그인
* https://prinzhorn.github.io/skrollr/

#### 사용방법
```
scrollTop 200에서 top:597px위치에서 scrollTop이 700에 올때는 콘텐츠가 297px로 이동
<li class="content01" data-200 = "top:597px" data-700 = "top:297px" data-smooth-scrolling = "on">
```
* html에 data를 사용해서 다양한 css 효과를 줄 수 있고, 사이트에서 다양한 옵션을 사용할 수 있다.

##### 이슈
* 모바일에서 스크롤을 막는 상황이 발생한다.
* js에서 data를 넣어주고, 모바일에서는 data를 넣지 않거나 플러그인에서 mobile일 경우 isMobile 관련 클래스가 주어지는데 클래스 제어 등을 통해 모바일은 다른 동작을 해야한다.