(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.navScroll = function (args) {
        var defParams = {
            wrap : '.nav_area',
            listNav : '.list_nav',
            activeClass : 'on'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if(!((this.wrap = $(this.opts.wrap)).length)) return;
        this.init();
    };
    win.UIO.navScroll.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.listNav = this.wrap.find(this.opts.listNav);
            this.listNavChild = this.listNav.children();
        },
        initLayout : function () {
            this.buildiScroll();
            for(var i = 0, max = this.listNavChild.length ; i < max ; i++) {
                if(this.listNavChild.eq(i).hasClass(this.opts.activeClass)){
                    this.curIndex = i;
                }
            }
            this.moveFunc();
        },
        bindEvents : function () {
            this.listNavChild.on('click', 'a', $.proxy(this.clickFunc, this));
        },
        buildiScroll : function () {
            this.iscroll = new IScroll(this.opts.wrap, {
                scrollX: true,
                click: true,
                disablePointer: true,
                disableTouch: false,
                disableMouse: false,
                resize : true,
                resizePolling : true,
                resizeScrollbars : true
            });
        },
        clickFunc : function (e) {
            e.preventDefault();
            var parent = $(e.delegateTarget),
                target = $(e.currentTarget),
                parentIndex = parent.index();
            if(this.curIndex === parentIndex) return;
            this.prevIndex = this.curIndex;
            this.curIndex = parentIndex;
            this.listNavChild.eq(this.prevIndex).removeClass(this.opts.activeClass);
            this.listNavChild.eq(this.curIndex).addClass(this.opts.activeClass);
            this.moveFunc();
        },
        moveFunc : function () {
            this.iscroll.scrollToElement(document.querySelector("#scroller li:nth-child(" + (this.curIndex+1) + ")"), null, null, true);
        }
    };

    $(function () {
        win.navScroll = new win.UIO.navScroll();
    });
    
})(window, window.jQuery, window.document);