## Skrollr
* Parallax 효과를 주는 플러그인
* https://prinzhorn.github.io/skrollr/

#### 사용방법
```
scrollTop 200에서 top:597px위치에서 scrollTop이 700에 올때는 콘텐츠가 297px로 이동
<li class="content01" data-200 = "top:597px" data-700 = "top:297px" data-smooth-scrolling = "on">
```
* html에 data를 사용해서 다양한 css 효과를 줄 수 있고, 사이트에서 다양한 옵션을 사용할 수 있다.

#### 이슈
* 모바일에서 스크롤을 막는 상황이 발생한다.
* js에서 data를 넣어주고, 모바일에서는 data를 넣지 않거나 플러그인에서 mobile일 경우 isMobile 관련 클래스가 주어지는데 클래스 제어 등을 통해 모바일은 다른 동작을 해야한다.
* 다른 방법이 있으면 update 하기
* 참고 : https://air.bluehole.net/main.do
```
var mainAboutAnimate = {
      init : function () {
          this.setElements();
          this.setOpts();
          this.buildSkrollr();
      },
      setElements : function () {
          this.aboutWrap = $('.about_wrap');
          this.aboutCont1 = this.aboutWrap.find('.about_1');
          this.aboutCont2 = this.aboutWrap.find('.about_2');
          this.aboutCont3 = this.aboutWrap.find('.about_3');
          this.decoCont1 = this.aboutWrap.find('.deco');
          this.decoCont2 = this.aboutWrap.find('.deco2');
          this.decoCont3 = this.aboutWrap.find('.deco3');
      },
      setOpts : function () {
          this.aboutCont1.attr({
               'data-200' : 'top:597px',
               'data-700' : 'top:297px'
          });
          this.aboutCont2.attr({
               'data-300' : 'top:1010px',
               'data-800' : 'top:410px'
          });
          this.aboutCont3.attr({
                'data-600' : 'top:1370px',
                'data-900' : 'top:970px'
          });
          this.decoCont1.attr({
                 'data-500' : 'right:100%;left:auto',
                 'data-900' : 'right:50%;margin-right:284px'
          });
          this.decoCont2.attr({
                 'data-500' : 'left:50%;margin-left:500px',
                 'data-900' : 'margin-left:-208px'
          });
          this.decoCont3.attr({
                 'data-600' : 'left:50%;margin-left:500px',
                 'data-900' : 'left:50%;margin-left:202px'
          });
      },
      buildSkrollr : function () {
          this.aboutSkrollr = skrollr.init({
              smoothScrollingDuration : 1200,
              smoothScrolling : true
          });
          this.isMobile = this.aboutSkrollr.isMobile();

          if(this.isMobile) {
              $('#wrap').css('minWidth', 0);
              this.aboutSkrollr.destroy();
              this.destroyOpts();
              this.mobileOpts();
          }
      },
      mobileOpts : function () {
          this.aboutCont1.css({
               'top' : '297px'
          });
          this.aboutCont2.css({
               'top' : '410px'
          });
          this.aboutCont3.css({
               'top' : '970px'
          });
      },
      destroyOpts : function () {
          this.aboutCont1.removeData();
          this.aboutCont2.removeData();
          this.aboutCont3.removeData();
          this.decoCont1.removeData();
          this.decoCont2.removeData();
          this.decoCont3.removeData();
      }
  };
  if ($(".about_wrap").length){
      mainAboutAnimate.init();
  }
```
