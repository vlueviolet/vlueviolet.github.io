# point
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
$(function () {
    var btnPrev = $('.btn-prev'),
        btnNext = $('.btn-next'),
        animateSelector = $('.box'),
        animateSelectorChild = animateSelector.children(),
        currentIndex = 0,
        oldIndex = currentIndex;

    var funcName = function () {
        animateSelectorChild.eq(oldIndex).stop().fadeOut('fast');
        animateSelectorChild.eq(currentIndex).stop().fadeIn('fast');
        oldIndex = currentIndex;
    };

    var prevFunc = function () {
        currentIndex = currentIndex - 1;
        if (currentIndex < 0) {
            currentIndex = animateSelectorChild.length - 1;
        }
        funcName();
    };

    var nextFunc = function () {
        currentIndex = currentIndex + 1;
        if (currentIndex >= animateSelectorChild.length) {
            currentIndex = 0;
        }
        funcName();
    };

    btnPrev.on('click', prevFunc);
    btnNext.on('click', nextFunc);
});
</script>
</body>
```
