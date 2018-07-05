# [Etc / Plugin] Javascript Source 

([written by. telltrue33](https://github.com/vlueviolet/telltrue33.github.io/blob/master/convention/02_Etc.md))
<br>

## scroll / resize 가 끝나고 실행되는 방법

* scroll / resize 이벤트는 해당 동작을 취할때마다 계속적으로 함수를 실행한다.
* 계속적으로 함수를 실행하면, 함수처리함에 있어 속도저하 및 성능저하를 불러일으킬수 있다.<br>여러개의 Object or 함수에, scroll / resize 이벤트가 있으면 더욱 빈번하게 발생한다.
* scroll 과 resize 가 끝났을때 한번 호출하게 되면, 함수처리를 많이 줄일수 있다.

### resize - End
```javascript
var resizeTime;
var resizeEndFunc = function () {
    window.console.log('resize 끝났을때 실행');
};
$(window).on('resize', function () {
    window.clearTimeout(resizeTime);
    resizeTime = window.setTimeout(resizeEndFunc, 150);
});
```
### scroll - End
```javascript
var scrollTime;
var scrollEndFunc = function () {
    window.console.log('scroll 끝났을때 실행');
}
$(window).on('scroll', function () {
    window.clearTimeout(scrollTime);
    scrollTime = window.setTimeout(scrollEndFunc, 150);
});
```
<br>

## [Plugin] outside

* 특정요소의 바깥부분에 마우스이벤트를 주고 싶을때 쓰는 [이벤트 플러그인](http://benalman.com/projects/jquery-outside-events-plugin/) (support Browser : ALL)
* 일반 이벤트처럼 쓰게되면 매번 실행이 되기 때문에, 특정요소의 **활성화/비활성화** 에 따라 **on/off** 되도록 한다.

```javascript
(function ($, doc, outside) {
    $.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup touchstart touchend'.split(' '),
        function (event_name) {
            jq_addOutsideEvent(event_name);
        }
    );
    jq_addOutsideEvent('focusin', 'focus' + outside);
    jq_addOutsideEvent('focusout', 'blur' + outside);
    $.addOutsideEvent = jq_addOutsideEvent;
    function jq_addOutsideEvent(event_name, outside_event_name) {
        outside_event_name = outside_event_name || event_name + outside;
        var elems = $(),
            event_namespaced = event_name + '.' + outside_event_name + '-special-event';
        $.event.special[ outside_event_name ] = {
            setup : function () {
                elems = elems.add(this);
                if(elems.length === 1) {
                    $(doc).bind(event_namespaced, handle_event);
                }
            },
            teardown : function () {
                elems = elems.not(this);
                if(elems.length === 0) {
                    $(doc).unbind(event_namespaced);
                }
            },
            add : function (handleObj) {
                var old_handler = handleObj.handler;
                handleObj.handler = function (event, elem) {
                    event.target = elem;
                    old_handler.apply(this, arguments);
                };
            }
        };
        function handle_event(event) {
            $(elems).each(function () {
                var elem = $(this);
                if(this !== event.target && !elem.has(event.target).length) {
                    elem.triggerHandler(outside_event_name, [event.target]);
                }
            });
        };
    };
})(window.jQuery, window.document, "outside");
```
<br>

## [Plugin] jquery.domchanged

* dom 이 변경되었을 경우의 체크하는 [이벤트 플러그인](https://github.com/nasaorc/jquery-domchanged-plugin) (support Browser : ALL)
<br>

## [Plugin] jquery.animate-enhanced

* 애니메이션을 더 효과적으로 쓸수 있도록 css 속성을 자동으로 치환해주는 [플러그인](https://github.com/benbarnett/jQuery-Animate-Enhanced) (support Browser : ALL)
<br>

## [Plugin] Swiper3

* 부드러운 터치슬라이드를 구현할수 있는 [플러그인](http://idangero.us/swiper/) (support Browser : IE10+, [IE9는 기본기능만 가능])
* [DEMO](http://idangero.us/swiper/demos/), [API](http://idangero.us/swiper/api/)
<br>

## [Plugin] Swiper2

* 부드러운 터치슬라이드를 구현할수 있는 [플러그인](https://github.com/nolimits4web/Swiper/tree/Swiper2) (support Browser : ALL)
* [API](https://github.com/nolimits4web/Swiper/blob/Swiper2/API.md)
* [Tip] Slick 플러그인과의 단점 : fade 메서드가 없다.
<br>

## [Plugin] Slick

* 부드러운 터치슬라이드를 구현할수 있는 [플러그인](http://kenwheeler.github.io/slick/) (support Browser : ALL)
* [DEMO](http://kenwheeler.github.io/slick/), [API](https://github.com/kenwheeler/slick)
* [Tip] Swiper2 플러그인과의 단점 : 터치의 가속도와 상관없이 1개씩밖에 안움직인다.
<br>

## [Plugin] imagesLoaded

* 이미지 로딩시점 체크하는 [플러그인](http://imagesloaded.desandro.com/v3/) (support Browser : IE8+)
* [DEMO](http://imagesloaded.desandro.com/v3/), [API](http://imagesloaded.desandro.com/v3/)
<br>

## [Plugin] iframe resize

* Cross 도메인에도 구현되는 iframe resize [플러그인](http://www.jqueryscript.net/layout/jQuery-Plugin-For-Auto-Resizing-iFrame-iFrame-Resizer.html) (support Browser : IE8+)
* [DEMO](http://www.jqueryscript.net/demo/jQuery-Plugin-For-Auto-Resizing-iFrame-iFrame-Resizer/example/), [API](http://www.jqueryscript.net/layout/jQuery-Plugin-For-Auto-Resizing-iFrame-iFrame-Resizer.html)
<br>

## [Plugin] Videojs

* video 태그를 지원하지 않는 브라우저를 호환하는 [플러그인](http://videojs.com/) (support Browser : IE8+)
* [DEMO](http://videojs.com/), [API](http://videojs.com/getting-started/)
* [Tip] IE7- 를 지원해야 한다면, 더 [하위버전](https://github.com/videojs/video.js/wiki/Older-versions)을 사용하면 된다.
