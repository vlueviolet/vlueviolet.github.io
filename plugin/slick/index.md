### Slick

* http://kenwheeler.github.io/slick/

#### 페이지 내 여러개 slick 적용
```
win.Project.MediaSlick = function (container) {
        var defParams = {
            slickOpts : {
                draggable: false,
                infinite: true,
                speed: 500,
                fade: true,
                initialSlide : 0,
                cssEase: 'linear'
            },
            mediaWrap : '.media_tab_cont',
            mediaCont : '.cont'
        }
        this.opts = defParams;
        this.layerMedia = $(container);
        this.init();
    };
    win.Project.MediaSlick.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.buildSlick();
        },
        setElements : function () {
            this.mediaViewWrap = this.layerMedia.find('.ly_movie_wrap');
            this.mediaViewBox = this.layerMedia.find('.media_slide');
            this.mediaViewSlide = this.layerMedia.find('.slide_cont');
            this.navNumWrap = this.layerMedia.find('.nav_num_wrap');
            this.curNavIndex = this.layerMedia.find('.cur');
            this.totalNavIndex = this.layerMedia.find('.total');
            this.mediaWrap = $(this.opts.mediaWrap);
            this.mediaCont = this.mediaWrap.find(this.opts.mediaCont);
        },
        initLayout : function () {
            this.totalNavIndex.text(this.mediaViewBox.children().length);
            this.openType = false;
        },
        buildSlick : function () {
            this.mediaViewBox.slick(this.opts.slickOpts);
            this.indexControl(this.opts.slickOpts.initialSlide);
            this.currentIndex = this.opts.slickOpts.initialSlide;
            this.afterSlickSetElements();
            this.afterSlickBindEvents();
            this.mediaViewBox.on('afterChange', $.proxy(this.afterBuildFunc,this));
            this.layerMedia.css({
                display : 'block',
                opacity : 0,
                zIndex : -1
            });
        },
        afterSlickSetElements : function () {
            this.slickBtn = this.layerMedia.find('.slick-arrow');
            this.slickSlide = this.layerMedia.find('.slick-slide');
            this.afterBuildFunc();
        },
        afterSlickBindEvents : function () {
            this.mediaViewBox.on('beforeChange', $.proxy(this.beforeChange, this));
            this.slickBtn.on('click', $.proxy(this.playControl, this));
            this.mediaCont.on('click', $.proxy(this.clickFunc, this));
        },
        afterBuildFunc : function () {
            this.timer = window.setTimeout($.proxy(function () {
                this.navNumWrap.css({
                    top : this.slickSlide.eq(this.currentIndex).outerHeight()
                });
            },this),1);
        },
        beforeChange : function (event, slick, currentSlide, nextSlide) {
            window.clearTimeout(this.timer);
            this.prevIndex = this.currentIndex;
            this.currentIndex = nextSlide;
            this.indexControl(nextSlide);
            this.navNumWrap.css({
                top : this.slickSlide.eq(this.currentIndex).outerHeight()
            });
        },
        indexControl : function (index) {
            this.curNavIndex.text(index + 1);
        },
        clickFunc : function (e) {
            e.preventDefault();
            this.afterBuildFunc();
            if(!this.openType) {
                this.layerMedia.css({
                    display : 'none',
                    opacity : 1,
                    zIndex : 110
                });
            }
            this.openType = true;
            var target = $(e.currentTarget);
            var targetData = target.data('media');

            for(var i = 0, max = this.mediaViewSlide.length ; i < max ; i++) {
                if(targetData === this.mediaViewSlide.eq(i).data('media')) {
                    this.prevIndex = this.currentIndex;
                    this.currentIndex = i;
                }
            }
            this.indexControl(this.currentIndex);
            window.commonLayer.layerView(this.layerMedia);
            this.mediaViewBox.slick('slickGoTo', this.currentIndex);
        },
        playControl : function () {
            var currentSlide = this.slickSlide.eq(this.prevIndex);
            if(currentSlide.find('iframe')[0]){
                currentSlide.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}','*');
            }
        }
    };
    win.Project.slickMediaCall = {
        init : function () {
            this.setElements();
            this.buildSlickCall();
        },
        setElements : function () {
            this.mediaBox = $('.ly_media,.ly_media2');
        },
        buildSlickCall : function () {
            for (var i = 0, max = this.mediaBox.length; i < max; i++) {
                new win.Project.MediaSlick(this.mediaBox.eq(i));
            }
        }
    };
```