(function ($, win) {
    'use strict';
    win.BlueHole = win.BlueHole || {};
     win.BlueHole.tabScroll = function (args) {
        var defParams = {
            tabWrap : '#scroller',
            tabLi : 'li',
            tabCont : 'a'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.tabWrap = $(this.opts.tabWrap)).length) return;
        this.init();
    };
    win.BlueHole.tabScroll.prototype = {
        init : function () {
            this.setElements();
            this.iScrollBindEvents();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.tabLi = this.tabWrap.find(this.opts.tabLi);
            this.tabCont = this.tabWrap.find(this.opts.tabCont);
         },
         bindEvents : function () {
            this.tabCont.on('click', $.proxy(this.clickFunc,this));
            $(window).on('resize', $.proxy(this.moveFunc,this));
         },
        iScrollBindEvents : function () {
            this.scrollCont = new IScroll('.tab_wrap .inner', {
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
        initLayout : function () {
            for(var i = 0, max = this.tabLi.length ; i < max ; i++) {
                if(this.tabLi.eq(i).hasClass('active')){
                    this.curIndex = i+1;
                }
            }
            this.moveFunc();
        },
        clickFunc : function (e) {
            e.preventDefault();
            this.target = $(e.currentTarget);
            this.curIndex = this.target.parent("li").index() + 1;
            this.tabLi.removeClass("active");
            this.target.parent("li").addClass("active");
            this.moveFunc();
        },
        moveFunc : function () {
            this.scrollCont.scrollToElement(document.querySelector("#scroller li:nth-child(" + this.curIndex + ")"), null, null, true);
        }
    };

    $(window).on('load', function(){
        win.tabScroll = new win.BlueHole.tabScroll();
    })
})(jQuery, window);