(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.topBtn = (function () {
        return {
            init : function () {
                this.setElements();
                this.bindEvents();
            },
            setElements : function () {
                this.topBtn = $('.btn_top');
            },
            bindEvents : function () {
                $(win).on('scroll', $.proxy(this.scrollFunc, this));
                this.topBtn.on('click', $.proxy(this.clickFunc, this));
            },
            scrollFunc : function () {
                var winTop = $(win).scrollTop();
                this.minOffsetTop = $('#wrap').offset().top;
                if(winTop > this.minOffsetTop) {
                    if(!this.topBtn.is(':visible')) {
                        this.topBtn.stop(true, true).fadeIn('fast');
                    }
                } else {
                    if(this.topBtn.is(':visible')) {
                        this.topBtn.stop(true, true).fadeOut('fast');
                    }
                }
            },
            clickFunc : function (e) {
                e.preventDefault();
                if ($('html, body').is(':animated')) return;
                $('html, body').stop().animate({ scrollTop : 0 }, 300);
            }
        };
    })();

    $(function () {
        win.UIO.topBtn.init();
    });
    
})(window, window.jQuery, window.document);