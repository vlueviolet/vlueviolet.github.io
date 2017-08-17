# point
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
$(function () {
    var arrayObj = [['data1', 'data2', 'attribute2', 'attribute1', 'attribute20'],
        ['attribute19','data1', 'data2', 'attribute2', 'attribute1'],
        ['attribute20', 'attribute19','data1', 'data2', 'attribute2'],
        ['attribute1', 'attribute20', 'attribute19','data1','datalast'],
        ['attribute1', 'attribute20']];

    // push
    var tagPush = [];
    tagPush.push('<table>');
    tagPush.push('<tbody>');
    for (var i = 0, max = arrayObj.length; i < max; i++) {
        tagPush.push('<tr>');
        for (var td = 0, tmax = 5; td < tmax; td++) {
            if (arrayObj[i][td]) {
                tagPush.push('<td>' + arrayObj[i][td] + '</td>');
            } else {
                tagPush.push('<td>없음</td>');
            }
        }
        tagPush.push('</tr>');
    }
    tagPush.push('</tbody>');
    tagPush.push('</table>');
    $('.push_html').get(0).innerHTML = tagPush.join('');

    // +=
    var tagPlus = '';
    tagPlus += '<table>';
    tagPlus += '<tbody>';
    for (var i = 0, max = arrayObj.length; i < max; i++) {
        tagPlus += '<tr>';
        for (var td = 0, tmax = 5; td < tmax; td++) {
            if (arrayObj[i][td]) {
                tagPlus += '<td>' + arrayObj[i][td] + '</td>';
            } else {
                tagPlus += '<td>없음</td>';
            }
        }
        tagPlus += '</tr>';
    }
    tagPlus += '</tbody>';
    tagPlus += '</table>';
    $('.plus_html').get(0).innerHTML = tagPlus;
});
</script>
</body>
```
<br>

## if
* 조건이 참이냐, 거짓이냐에 따라 문장을 실행하거나 실행하지 않을 수 있음.

```html
<script>
var a = 74; // a변수에 74를 저장합니다.
if (a > 90) {
    alert('수'); // if 조건이 거짓이므로 코드가 실행되지 않음
} else if (a > 80) {
    alert('우'); // else if 조건이 거짓이므로 코드가 실행되지 않음
} else {
    alert('낙제'); // else if 조건이 거짓이므로 코드가 실행
}
</script>
```
<br>

## switch
* if 문의 복수 조건과 비슷

```html
<script>
var a = 74; // a변수에 74를 저장합니다.
switch (a) {
    case 10 :
        alert('10');
        break;
    case 74 :
        alert('74');
        break;
    case 97 :
        alert('97');
        break;
    default :
        alert('default');
        break;
}
</script>
```
<br>

## while
* 단순 반복문

```html
<script>
var a = 0;
while (a < 10) {
    console.log(a);
    a++;
}

var b = 0;
while (b < 10) {
    if (b > 5) {
        break;
    }
    console.log(b);
    b++;
}

var c = 0;
while (c < 10) {
    c++;
    if (c == 3 || c == 6) {
        continue;
    }
    console.log(c);
}
</script>
```
<br>

## for
* 반복문

```html
<script>
for (var a = 0; a < 10; a++) {
    console.log(a);
}

var b = 0;
for (; b < 10; b++) {
    console.log(b);
}

var c = 0;
for (; c < 10;) {
    console.log(c);
    c++;
}
</script>
```
