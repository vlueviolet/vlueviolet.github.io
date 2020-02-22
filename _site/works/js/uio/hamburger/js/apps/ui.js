(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.hamburger = (function () {
        return {
            init : function () {
                this.setElements();
                this.initLayout();
                this.bindEvents();
            },
            initLayout : function () {
                this.width = this.wrap.outerWidth(true);
            },
            setElements : function () {
                this.wrap = $('#wrap');
                this.btnMenu = $('.btn_menu');
                this.nav = $('#nav');
                this.navBox = $('.nav_box');
                this.navInner = $('.inner');
                this.btnClose = $('.btn_close');
                this.activeClass = 'on';
            },
            bindEvents : function () {
                this.btnMenu.on('click', $.proxy(this.clickFunc, this));
                this.btnClose.on('click', $.proxy(this.closeFunc, this));
                $(win).on('resize', $.proxy(this.resizeFunc, this));
            },
            clickFunc : function (e) {
                e.preventDefault();
                var _this = this;
                this.nav.stop(true, true).fadeIn('fast');
                this.navBox.stop(true, true).animate({
                    'left' : 0
                }, 'fast', function () {
                    var $this = _this;
                    _this.navInner.on('clickoutside touchendoutside', function () {
                        $this.outSideEvents(_this.navInner);
                    });
                });
            },
            closeFunc : function (e) {
                e.preventDefault();
                var _this = this;
                this.navBox.animate({
                    'left' : -(this.width)
                }, 'fast', function () {
                    _this.nav.stop(true, true).fadeOut('fast');
                });
            },
            outSideEvents : function (target) {
                this.btnClose.triggerHandler('click');
                target.off('clickoutside touchendoutside');
            },
            resizeFunc : function () {
                this.initLayout();
            }
        };
    })();
    $(function () {
        win.UIO.hamburger.init();
    });
})(window, window.jQuery, window.document);