(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.accordion = win.UIO.accordion || {};
    win.UIO.accordion = function (args) {
        var defParams = {
            wrap : '.list',
            listItem : '.list_item',
            details : '.details',
            activeClass : 'on'
        };
        this.opts = $.extend({}, defParams, (args || {}));
        if(!(this.wrap = $(this.opts.wrap)).length) return;
        this.init();        
    };
    win.UIO.accordion.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.listItem = this.wrap.find(this.opts.listItem);
            this.details = this.wrap.find(this.opts.details);
        },
        bindEvents : function () {
            this.listItem.on('click', this.opts.clickObj, $.proxy(this.clickFunc, this));
        },
        clickFunc : function (e) {
            e.preventDefault();
            var parent = $(e.delegateTarget),
                target = $(e.currentTarget),
                details = parent.find(this.details);

            if(parent.hasClass(this.opts.activeClass)) {
                this.listItem.removeClass(this.opts.activeClass);
                this.details.slideUp('fast');
                parent.removeClass(this.opts.activeClass);
                details.slideUp('fast');
            } else {
                this.listItem.removeClass(this.opts.activeClass);
                this.details.slideUp('fast');
                parent.addClass(this.opts.activeClass);
                details.slideDown('fast');
            }            
        }
    };
    $(function () {
        win.accordion = new win.UIO.accordion();
    });
})(window, window.jQuery, window.document);