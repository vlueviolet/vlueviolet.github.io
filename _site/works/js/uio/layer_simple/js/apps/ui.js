(function (win, $, doc) {
    'use strict';
    var UTIL = win.UIO.Common.util,
        PAGE = win.UIO.page;

    win.UIO = win.UIO || {};
    win.UIO.layer = function (args) {
        var defParams = {
            btnObj : '.btn_open',
            layerWrap : '.layer_wrap',
            layerObj : '.layer_content',
            closeBtn : '.btn_close',
            type : 'default',
            speed : 150,
            viewBefore : null,
            viewAfter : null,
            closeBefore : null,
            closeAfter : null
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if(!((this.btnObj = $(this.opts.btnObj)).length)) return;
        this.init();
    };
    win.UIO.layer.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents(); 
        },
        reInit : function () {
            
        },
        setElements : function () {
            this.layerWrap = $(this.opts.layerWrap);
            this.layerObj = this.layerWrap.find(this.opts.layerObj);
            this.closeBtn = this.layerWrap.find(this.opts.closeBtn);
        },
        initLayout : function () {
            var focusOutTagClass = 'js-focusout',
                focusOutTag = '<span class="' + focusOutTagClass + '" tabindex="0" style="overflow:hidden;position:absolute;left:0;top:0;z-index:-1;width:1px;height:1px;font-size:0;line-height:0"></span>';

            if (!this.layerObj.prev().hasClass(focusOutTagClass)) {
                this.layerObj.before(focusOutTag);
            }

            if (!this.layerObj.next().hasClass(focusOutTagClass)) {
                this.layerObj.after(focusOutTag);
            }

            this.prevFocus = this.layerObj.prev();
            this.nextFocus = this.layerObj.next();
            this.layerObj.attr('tabIndex', 0);
        },
        bindEvents : function () {
            this.btnObj.on('click', $.proxy(this.layerView, this));
            this.closeBtn.on('click', $.proxy(this.layerClose, this));
            this.prevFocus.on('focusin', $.proxy(this.prevFocusFunc, this));
            this.nextFocus.on('focusin', $.proxy(this.nextFocusFunc, this));
            this.layerObj.on('keydown', $.proxy(this.escapeFunc, this));
        },
        layerClose : function () {
           this.layerObj.triggerHandler('clickoutside');
        },
        outSideEvents : function () {
            this.layerObj.on('clickoutside touchendoutside', $.proxy(this.layerClickOutside, this));
        },
        escapeFunc : function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode !== 27) return;
            this.layerClose();
        },
        layerView : function (e) {
            this.btnTarget = $(e.currentTarget);
            this.outCallback('viewBefore');
            if (this.opts.type === 'default') {
                this.layerWrap.stop(true, true).show();
                this.showAfterBugFunc();
            } else if (this.opts.type === 'fade') {
                this.layerWrap.stop(true, true).fadeIn(this.opts.speed, $.proxy(this.layerViewAfter, this));
            } else if (this.opts.type === 'slide') {
                this.layerWrap.stop(true, true).slideDown(this.opts.speed, $.proxy(this.layerViewAfter, this));
            }
            this.layerObj.focus();
        },
        showAfterBugFunc : function () {
            win.clearTimeout(this.showAfterTimeout);
            this.showAfterTimeout = win.setTimeout($.proxy(this.layerViewAfter, this), 30);
        },
        layerViewAfter : function () {
            this.outSideEvents();
            PAGE.scrollLock(true);
            this.outCallback('viewAfter');
        },
        layerClickOutside : function () {
            this.outCallback('closeBefore');    
            win.clearTimeout(this.closeBeforeTimeout);
            this.closeBeforeTimeout = win.setTimeout($.proxy(this.hideBeforeBugFunc, this), 30);
            this.layerObj.off('clickoutside touchendoutside');
        },
        hideBeforeBugFunc : function () {
            if (this.opts.type === 'default') {
                this.layerWrap.stop(true, true).hide();
                this.hideAfterBugFunc();
            } else if (this.opts.type === 'fade') {
                this.layerWrap.stop(true, true).fadeOut(this.opts.speed, $.proxy(this.layerCloseAfter, this));
            } else if (this.opts.type === 'slide') {
                this.layerWrap.stop(true, true).slideUp(this.opts.speed, $.proxy(this.layerCloseAfter, this));
            }
            this.btnTarget.focus();
        },
        hideAfterBugFunc : function () {
            win.clearTimeout(this.closeAfterTimeout);
            this.closeAfterTimeout = win.setTimeout($.proxy(this.layerCloseAfter, this), 30);
        },
        layerCloseAfter : function (e) {
            this.layerClose();
            PAGE.scrollLock(false);
            this.outCallback('closeAfter');
        },
        prevFocusFunc : function () {
            this.closeBtn.focus();
        },
        nextFocusFunc : function () {
            this.layerObj.focus();
        },
        outCallback : function (type) {
            var callbackObject = this.opts[type];

            if (callbackObject !== null) {
                callbackObject();
            }
        }
    };

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
        PAGE.init();
        win.layer = new win.UIO.layer();
        win.UIO.topBtn.init();
    });
    
})(window, window.jQuery, window.document);