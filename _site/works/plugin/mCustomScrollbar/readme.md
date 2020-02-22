## mCustomScrollbar

스크롤 디자인 변경하는 플러그인

* 데모 http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
* 파일 다운 https://github.com/malihu/malihu-custom-scrollbar-plugin
* 옵션 확인 http://manos.malihu.gr/jquery-custom-content-scroller/
* support ie7+, modern (except mobile)
* 스크롤이 overflow:auto 영역 밖에 있어 제어하기 편함

#### 실행방법
```javascript
// 기본 실행
$(selector).mCustomScrollbar({
    options..
});

// 콜백함수 사용
$(selector).mCustomScrollbar({
    options..
    callbacks:{
        onScroll:function(){
            myCustomFn(this);
        }
    }
});
function myCustomFn(el){
    console.log(el.mcs.top);
}
```

#### destroy
```javascript
$(selector).mCustomScrollbar("destroy");
```