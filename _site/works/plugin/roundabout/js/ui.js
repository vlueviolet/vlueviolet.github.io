(function (win, $) {
    'use strict';
    $(document).ready(function() {
        var carouselMedia = {
            init : function () {
                this.setElements();
                this.initOpts();
                this.initLayout();
                this.buildRoundabout();
                this.roundaboutBindEvents();
            },
            setElements : function () {
                this.mediaWrap = $('.media_wrap');
                this.myCarousel = this.mediaWrap.find('#carousel');
                this.myCarouselChild = this.myCarousel.children();
                this.paging = this.mediaWrap.find('.paging');
                this.pagingIn = this.paging.find('.inner');
            },
            initOpts : function () {
                this.loopIndex = 0;
                this.btnAniType = false;
            },
            initLayout : function () {
                var pages = [];
                for (var i = 0, max = this.myCarouselChild.length; i < max; i++) {
                    pages.push('<button type="button" class="js-btn_page">' + (i + 1) + '</button>');
                }
                this.pagingIn.append(pages.join(''));
                this.btnPage = this.pagingIn.find('.js-btn_page');
            },
            buildRoundabout : function () {
                this.myCarousel.roundabout({
                    minScale : 0.82,
                    childSelector : "li",
                    autoplay : false,
                    autoplayDuration : 500000,
                    autoplayPauseOnHover : true,
                    btnNext : '.btn_next',
                    btnPrev : '.btn_prev',
                    enableDrag : true,
                    minZ : 10,
                    maxZ : 20
                }, $.proxy(function () {
                    this.oldIndex = this.myCarousel.children('.roundabout-in-focus').index();
                    this.dotFunc();
                }, this));
            },
            roundaboutBindEvents : function () {
                this.btnPage.on('click', $.proxy(this.clickBtnPage, this));
                this.myCarousel.on('animationEnd', $.proxy(this.roundAnimationEnd, this));
            },
            clickBtnPage : function (e) {
                e.preventDefault();
                var target = $(e.currentTarget),
                    targetIndex = target.index();
                if (this.oldIndex == targetIndex) return;
                this.roundAnimationControl(targetIndex);
            },
            roundAnimationControl : function (index) {
                if (this.btnAniType) return;
                this.btnAniType = true;
                this.direction = (this.oldIndex < index) ? 'next' : 'prev';
                this.loopIndex = Math.abs(this.oldIndex - index);
                this.roundAnimation();
            },
            roundAnimation : function () {
                this.loopIndex--;
                if (this.direction === 'next') {
                    this.mediaWrap.find('.btn_next').triggerHandler('click');
                } else if (this.direction === 'prev') {
                    this.mediaWrap.find('.btn_prev').triggerHandler('click');
                }
            },
            roundAnimationEnd : function () {
                if (this.loopIndex <= 0) {
                    this.oldIndex = this.myCarousel.children('.roundabout-in-focus').index();
                    this.dotFunc();
                    this.btnAniType = false;
                } else {
                    window.setTimeout($.proxy(function () {
                        this.roundAnimation();
                    }, this), 1);
                }
            },
            dotFunc : function () {
                this.btnPage.eq(this.oldIndex).addClass('active').siblings().removeClass('active');
            }
        };
        if ($("#carousel").length){
            carouselMedia.init();
        }
    });

})(window, window.jQuery);