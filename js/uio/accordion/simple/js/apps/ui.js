(function (win, $, doc) {
    'use strict';
    win.UIO = win.UIO || {};

    win.UIO.accordion = (function () {
        return {
            init : function () {
                this.setElement();
                this.setOpts();
                this.bindEvents();
            },
            setElement : function () {
                this.listCont = $('.week_item');
            },
            setOpts : function () {
                this.activeClass = 'on';
            },
            bindEvents : function () {
                this.listCont.on('click', '.summary', $.proxy(this.clickFunc, this));
            },
            clickFunc : function (e) {
                e.preventDefault();
                var parent = $(e.delegateTarget),
                target = $(e.currentTarget);                
                if(parent.hasClass(this.activeClass)) {
                    parent.removeClass(this.activeClass);
                } else {
                    this.listCont.removeClass(this.activeClass);
                    parent.addClass(this.activeClass);
                }
            }
        };
    })();

    $(function () {
        win.UIO.accordion.init();
    });
    
})(window, window.jQuery, window.document);