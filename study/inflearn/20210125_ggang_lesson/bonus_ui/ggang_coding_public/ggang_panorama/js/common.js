/**
 * [ggang.Panorama ver 0.1]
 * 애플 스크롤 강좌 : https://www.inflearn.com/course/애플-스크롤-인터렉션-자바스크립트
 * 유튜브채널 : https://www.youtube.com/channel/UCWJfpq3-gjbreL6mdfPhL-Q?view_as=subscriber
 * 만든이 : 깡코딩
 * 피드백 : ggangcodingqna@gmail.com
 * 상업용 및 소스 수정해서 사용해도 됩니다. 디스크립션은 지우지 말아주세요.
 * etc : 본소스 코드는 후에 유튜브에 설명과 함께 무료 강좌로 올라올 예정이니 코드분석이 어려운 분들은 유튜브를 참고해주세요 :)
 */
	var ggangPano = function(){
		var panowrap = $(".sj_panorama .pano_wrap");
		var	listWrap = panowrap.children();
		var	item = listWrap.children();
		var	listClone = null;
		var	itemWidth = item.width();
		var	itemLength = item.length;
		var	listWidth = itemWidth * itemLength;
		var	winWidth = $(window).width();
		var	move = 0;
		var	contorls = panowrap.parent().find(".controls");
		var	timer;

			_init = function(){
				panowrap.css({width: (listWidth) * 2 + "px"})
				listWrap.css({width: listWidth + "px"});
				listWrap.clone().appendTo(panowrap);
				listClone = panowrap.children();

				_render();
				_event();
			};
			_event = function(){

				contorls.find("a.play_on").on('click',function(e){

					if($(this).hasClass("active")){
						_clear();
						$(this).removeClass("active");
					}else {
						$(this).addClass("active");
						_render();
					}
				});
			}
			_render = function(){


				if( listWidth <= move){

					listClone.css({"transform":"translateX(" + 0  + "px)" });
					move = 0;
				}

				move +=1;
				listClone.css({"transform":"translateX(" + -move  + "px)" });
				timer = window.requestAnimationFrame(_render);

			};
			_clear = function(){
				window.cancelAnimationFrame(timer);
			};
			window.requestAnimFrame = (function(callback) {
			    return window.requestAnimationFrame ||
			    window.webkitRequestAnimationFrame ||
			    window.mozRequestAnimationFrame ||
			    window.oRequestAnimationFrame ||
			    window.msRequestAnimationFrame ||
				function (callback) {window.setTimeout(callback, 1000);}
			});

		_init();

	};

$(function(){
	ggangPano();
});

