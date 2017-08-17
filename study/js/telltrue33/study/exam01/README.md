# point
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
$(function () {
    // jQuery
    var eventSelector = $('.btn'),
        animateSelector = $('.box');
    var funcName = function () {
        animateSelector.css('background', 'yellow');
    };
    eventSelector.on('click', funcName);

    // javascript
    var eventSelector = document.getElementsByClassName('btn')[0],
        animateSelector = document.getElementsByClassName('box')[0];
    var funcName = function () {
        animateSelector.style.backgroundColor = 'yellow';
    };
    eventSelector.onclick = funcName;
});
</script>
</body>
```
