# point
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
(function (win, $) {
    var objFunc = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.btn = $('.btn');
        },
        bindEvents : function () {
            this.btn.on('click', $.proxy(this.viewFunc, this));
        },
        viewFunc : function (e) {
            $(e.currentTarget).parent().addClass('active');
        }
    };
    $(function () {
        objFunc.init();
    });
})(window, window.jQuery);
</script>
</body>
```
