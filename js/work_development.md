# 개발 업무 대응

## 업무 전 확인할 것
* ajax 영역 확인 : dom changed 되는 영역에 대한 처리를 어떻게 할 것인지
* 기본으로 추가하는 플러그인
    * [outsideEvent](http://benalman.com/projects/jquery-outside-events-plugin/)<br>
            * 특정요소의 바깥부분에 마우스이벤트를 주고 싶을때 사용<br>
            * 일반 이벤트처럼 쓰게되면 매번 실행이 되기 때문에, 특정요소의 **활성화/비활성화** 에 따라 **on/off** 되도록 한다.<br>
            * support Browser : ALL
    * [domchanged](https://github.com/nasaorc/jquery-domchanged-plugin)<br>
            * dom 변경 체크하는 플러그인<br>
            * support Browser : ALL
    * [jquery.animate-enhanced](https://github.com/benbarnett/jQuery-Animate-Enhanced)<br>
            * 애니메이션을 더 효과적으로 쓸수 있도록 css 속성을 자동으로 치환<br>
            * 애니메이션을 1번만 사용하게 되는 버그가 있는데, 이를 해결하기 위해서는 avoidCSSTransitions를 넣어서 enhanced를 안쓰겠다고 해줘야 함.<br>* 참고 : [http://hsvn.hivelab.co.kr/cjo/lh/motion/exam01/index.html](http://hsvn.hivelab.co.kr/cjo/lh/motion/exam01/index.html)<br>* support Browser : ALL

## Dom Changed
### jquery.domchanged 사용
이 플러그인은 크롬에서 dom changed를 확인 할 수 없고, ajax 동작시에만 확인 가능하다.

### reInit() 제공
```javascript
win.BlueHole.replyOption = function (args) {

};
win.BlueHole.replyOption.prototype = {
    init : function () {},
    setElements : function () {},
    initLayout : function () {},
    bindEvents : function () {},
    layerView : function () {},
    layerClose: function () {},
    unBindEvents: function () {},
    reInit: function () {
        this.unBindEvents();
        this.setElements();
        this.bindEvents();
    },
}
```

### ajax 영역을 확인해서 ajax 아닌 영역 기준으로 이벤트 걸기

```javascript

<ul class="list_reply"> //ajax 영역 아님
<li> //ajax 영역
    <div class="reply_set">
        <button type="button" class="btn_option">덧글 설정</button>
        <div class="layer_reply">
          <button type="button" class="btn btn_dec" data-layer-button="layer_dec" data-tooltip-name="tooltip_dec"><span class="txt">신고</span></button>
        </div>
    </div>
</li>
<li>
    <div class="reply_set">
        <button type="button" class="btn_option">덧글 설정</button>
        <div class="layer_reply">
          <button type="button" class="btn btn_dec" data-layer-button="layer_dec" data-tooltip-name="tooltip_dec"><span class="txt">신고</span></button>
        </div>
    </div>
</li>
<li>
    <div class="reply_set">
        <button type="button" class="btn_option">덧글 설정</button>
        <div class="layer_reply">
          <button type="button" class="btn btn_dec" data-layer-button="layer_dec" data-tooltip-name="tooltip_dec"><span class="txt">신고</span></button>
        </div>
    </div>
</li>
//... 이하 생략
</ul>

// ajax 영역이 아닌 곳을 기준으로 이벤트를 실행하도록 하면됨
$(function () {
    $('.list_reply').on('click', '.btn_option', function (e) {
        var target = $(e.currentTarget); //.btn_option
        //이하 레이어 열리는 등 이벤트 실행
    });

    //on 이벤트를 거는 대상은 요소이지만, 그 안에 실제 동작하는 selector는 문자열이어야함
    this.replyWrap.on('click', this.opts.replySetBtn, $.proxy(this.layerView, this));
});

```
* * *

## ajaxafter 이벤트 만들어 주기

어떤 버튼을 클릭하면 on클래스를 추가하여 레이어 팝업이 열린다고 가정할 때,

```javascript
$('.btn_option').on('click', function (e) {
    var target = $(e.currentTarget);

    target.parents('.reply_set').addClass('on');
});
```
개발에서 버튼을 클릭하는 순간, 비지니스 로직을 거친 후에
on클래스를 추가하려 할 때, 위와 같은 상황은 무조건 클릭하는 순간 클릭 이벤트가 발생하여
on클래스가 추가되기 때문에 개발자가 자유롭게 사용하기 어렵다.

이럴때는 click 이벤트를 개발자가 제어할 수 있는 형태로 제공해주면 된다.

click과 더불어 ajaxafter 이벤트를 생성하면,
개발자에게 click 이벤트를 off하라고 하면 된다.
비지니스 로직을 거친 후, trigger를 사용하여 ajaxafter 이벤트를 생성 시킨다.

```javascript
// click 이벤트 선언
$('.btn_option').on('click ajaxafter', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget);

    target.parents('.reply_set').addClass('on');
});
```

```javascript
// 개발자가 ajax 실행 후 trigger 사용
$('.btn_option').off('click').on('click', function (e) {
    e.preventDefault();
    var _this = $(this);    // btn 담기
    win.setTimeout(function () {    //ajax 동작으로 가정
        _this.trigger('ajaxafter');
    }, 1000);
});
```
