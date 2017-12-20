### 이미지 이동, 확대, 축소

#### 이미지 화면 중앙에 오는 함수
```
// 각 지역의 위치와 지름 정보
this.areaPosition = [
    [1464,1430,1202], //x,y,2r
    [922,2461,461],
    [1480,3007,503],
    [454,2899,616],
    [476,1384,411],
    [963,832,594],
    [382,234,368],
    [2934,410,716],
    [2739,2323,531]
];

calculateMiddlePosition : function () {
    // var topOffset = this.mapHeight - this.areaPosition[this.currentIndex][1] - this.areaPosition[this.currentIndex][2];
    // var leftOffset = this.mapWidth - this.areaPosition[this.currentIndex][0] - this.areaPosition[this.currentIndex][2];
    // var leftValue = this.mapWidth - this.winWidth/2  - this.areaPosition[this.currentIndex][2]/2 - leftOffset;
    // var topValue = this.mapHeight - this.winHeight/2  - this.areaPosition[this.currentIndex][2]/2 - topOffset;

    // 위 계산식을 정리하면 아래와 같다.
    var topValue =  this.areaPosition[this.currentIndex][1] + this.areaPosition[this.currentIndex][2] - this.winHeight/2  - this.areaPosition[this.currentIndex][2]/2;
    var leftValue = this.areaPosition[this.currentIndex][0] + this.areaPosition[this.currentIndex][2] - this.winWidth/2  - this.areaPosition[this.currentIndex][2]/2;

    this.map.stop().animate({
        top : -topValue,
        left : -leftValue,
        margin : 0
    },1000, $.proxy(function () {
        this.animateType = false;
    }, this));
}
```
#### 이미지 확대, 축소 함수
```
zoomOutFunc : function () {
    this.viewMapSpotEnd();
    var scaleWidth = this.winHeight*parseInt(this.mapImgWidth)/parseInt(this.mapImgHeight)+'px';
    var scaleHeight = this.winHeight;
    var marginTop = -scaleHeight/2 + 'px';
    var marginLeft = -parseInt(scaleWidth)/2 + 'px';
     this.mapLink.css({
        width : scaleWidth,
        height : scaleHeight,
        top : '50%',
        left : '50%',
        marginTop : marginTop,
        marginLeft : marginLeft
    });
    this.map.stop().animate({
        width : scaleWidth,
        height : scaleHeight,
        top : '50%',
        left : '50%',
        marginTop : marginTop,
        marginLeft : marginLeft
    },1000, $.proxy(function () {
        this.animateType = false;
    }, this));
},
zoomInFunc : function () {
    this.viewMapSpotEnd();
    var marginTop = -parseInt(this.mapImgHeight)/2 + 'px';
    var marginLeft = -parseInt(this.mapImgWidth)/2 + 'px';
    this.mapLink.css({
        width : this.mapImgWidth,
        height : this.mapImgHeight,
        marginTop : marginTop,
        marginLeft : marginLeft
    });
    this.map.stop().animate({
        width : this.mapImgWidth,
        height : this.mapImgHeight,
        marginTop : marginTop,
        marginLeft : marginLeft
    }, 1000, $.proxy(function () {
        this.animateType = false;
        this.calculateMiddlePosition();
    }, this));
},
```