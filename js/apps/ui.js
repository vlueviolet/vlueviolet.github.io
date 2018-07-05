(function (win, $, doc) {
    'use strict';

    win.Common = win.Common || {};

    win.BtnTop = (function () {
        return {
            init : function () {
                this.setElements();
                this.bindEvents();
            },
            setElements : function () {
                this.btnTop = $('.btn_top');
            },
            bindEvents : function () {
                this.btnTop.on('click', $.proxy(this.clickFunc, this));
                $(win).on('scroll', $.proxy(this.scrollFunc, this));
            },
            clickFunc : function (e) {
                e.preventDefault();
                if($('html, body').is(':animated')) return;
                
                $('html, body').animate({
                    scrollTop : 0
                }, 300);
            },
            scrollFunc : function () {
                var winTop = $(win).scrollTop();
                this.minOffsetTop = $('#wrap').offset().top;
                if(winTop > this.minOffsetTop) {
                    this.btnTop.fadeIn();
                } else {
                    this.btnTop.fadeOut();
                }
            }
        }
    })();

    $(function () {
        win.BtnTop.init();
    });

})(window, window.jQuery, window.document);