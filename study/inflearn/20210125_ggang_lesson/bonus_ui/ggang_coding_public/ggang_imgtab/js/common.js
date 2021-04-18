/**
 * [ggang.Tab.Gallery ver 0.1]
 * 애플 스크롤 강좌 : https://www.inflearn.com/course/애플-스크롤-인터렉션-자바스크립트
 * 유튜브채널 : https://www.youtube.com/channel/UCWJfpq3-gjbreL6mdfPhL-Q?view_as=subscriber
 * 만든이 : 깡코딩
 * 피드백 : ggangcodingqna@gmail.com
 * 상업용 및 소스 수정해서 사용해도 됩니다. 디스크립션은 지우지 말아주세요.
 * etc : 본소스 코드는 후에 유튜브에 설명과 함께 무료 강좌로 올라올 예정이니 코드분석이 어려운 분들은 유튜브를 참고해주세요 :)
 */
var tabGallery = function(){
    var galleryWrap = $('.grallery_box');
    var viewGallery = galleryWrap.find('.view_gallery .img');
    var btnList = galleryWrap.find('.btn_wrap a');
    var moveBg = galleryWrap.find('.move_bg')

    btnList.on('click',function(){

        var obj = $(this);
        var idx = btnList.index(this);
        var moveBgWidth = btnList.eq(idx).outerWidth();
        var pos = obj.position().left;

        if(obj.hasClass('active')){
           return false;
        }else {
            btnList.removeClass('active');
            viewGallery.removeClass('active');

            obj.addClass('active');
            viewGallery.eq(idx).addClass('active');
            moveBg.css({'left': pos + 'px', 'width': moveBgWidth + 'px'});
        }

    });
};

$(function(){
    tabGallery();
});