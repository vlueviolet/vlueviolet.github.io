(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.selectbox = win.UIO.selectbox || {};
    win.UIO.selectbox = function (args) {
        var defParams = {
            wrap : '.select_wrap',
            selectBox : '.sel_bx',
            listTitle : '.sel_tit',
            listBoxItem : '.sel_item',
            mobileSelectBox : '.m_sel_bx',
            activeClass : 'on'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if (!(this.wrap = $(this.opts.wrap)).length) return;
        this.init();
    };
    win.UIO.selectbox.prototype = {
        init : function () {
            this.setElements();
            this.initLayout();
            this.bindEvents();
        },
        initLayout : function () {
            this.deviceFunc();
        },
        setElements : function () {
            this.selectBox = this.wrap.find(this.opts.selectBox);
            this.listTitle = this.selectBox.find(this.opts.listTitle);
            this.listBoxItem = this.selectBox.find(this.opts.listBoxItem);
            this.mobileSelectBox = this.wrap.find(this.opts.mobileSelectBox);
        },
        bindEvents : function () {
            this.wrap.on('click',  this.opts.listTitle , $.proxy(this.clickFunc, this));
            this.listBoxItem.on('click', 'a', $.proxy(this.clickListFunc, this));
        },
        clickFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                parent = target.parent();
            if(parent.hasClass(this.opts.activeClass)) {
                parent.removeClass(this.opts.activeClass);
                parent.off('clickoutside touchendoutside');
            } else {
                parent.addClass(this.opts.activeClass);
                parent.on('clickoutside touchendoutside', $.proxy(function () {
                    this.outsideEvents(parent);
                }, this));
            }
        },
        clickListFunc : function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(e.currentTarget),
                parent = $(e.delegateTarget),
                parentClosestWrap = parent.closest(this.selectBox);
            parentClosestWrap.find(this.listTitle).text(target.text());
            parentClosestWrap.removeClass(this.opts.activeClass);
        },
        outsideEvents : function (target) {
            target.removeClass(this.opts.activeClass);
            target.off('clickoutside touchendoutside');
        },
        deviceFunc : function () {
            var type = win.UIO.isDevice;
            if(type === undefined) return;
            this.selectBox.addClass('mobile');
        },
        unBindEvents : function () {
            this.wrap.off('click', this.opts.clickObj);
            this.listBoxItem.off('click', 'a');
        },
        reInit : function () {
            this.unBindEvents();
            this.setElements();
            this.initLayout();
            this.bindEvents();
        }
    };

    // device 체크
    win.UIO.isDevice = (function () {
        return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
    })();

    // 셀렉트박스 추가 버튼, reInit 테스트용
    win.UIO.addButton = (function () {
        return {
            init : function () {
                this.setElements();
                this.bindEvents();
            },
            setElements : function () {
                this.wrap = $('.js-button-area');
                this.btn = $('button');
                this.html = $('.select_wrap');
            },
            bindEvents : function () {
                this.btn.on('click', $.proxy(this.clickFunc, this));
            },
            clickFunc : function (e) {
                e.preventDefault();
                var target = $(e.currentTarget),
                    text = '<div class="sel_bx"><a href="#" class="sel_tit">선택 '+($('.sel_bx').length+1)+'</a><div class="lst_bx"><ul class="sel_lst"><li class="sel_item"><a href="#">전체</a></li><li class="sel_item"><a href="#">1</a></li><li class="sel_item"><a href="#">2</a></li><li class="sel_item"><a href="#">3</a></li></ul></div><select class="m_sel_bx"><option value="">전체</option><option class="sel_item">1</option><option class="sel_item">2</option><option class="sel_item">3</option><option class="sel_item">4</option><option class="sel_item">5</option><option class="sel_item">6</option><option class="sel_item">7</option></select></div>';
                this.html.append(text);
                win.selectbox.reInit();
            }
        };
    })();

    $(function () {
        win.selectbox = new win.UIO.selectbox();
        win.UIO.addButton.init();
    });
    
})(window, window.jQuery, window.document);