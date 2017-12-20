## Video 제어

### html5 video 태그
* html5 비디오
    * Video https://www.w3schools.com/tags/ref_av_dom.asp
    * https://msdn.microsoft.com/ko-kr/library/hh924822(v=vs.85).aspx
    * https://msdn.microsoft.com/ko-kr/library/hh924820(v=vs.85).aspx
* 비디오 이벤트 확인 http://samples.msdn.microsoft.com/Workshop/samples/media/videoevents.htm
* 자바스크립트 비디오 제어  https://msdn.microsoft.com/ko-kr/library/hh924823
* 미디어 이벤트 https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
* 프레임 제어 하는듯한 플러그인 (연구 필요) https://github.com/allensarkisyan/VideoFrame

####  jQuery Video 선택자
```
var video = $('video');
this.video = this.guideStart.find('video');
this.video.get(0).play();
//또는
this.video2 = this.guideStart.find('video');
this.video2[0].play();
this.video2[0].loop = true;
```

#### 재생 확인 (사운드, 비디오 canplay 체크)
```
mediaSupportFunc : function () {
    var canPlayCount = 0,
        videoCanType = false,
        soundCanType = false;
    this.allVideo.on('canplay canplaythrough', $.proxy(function () {
        if(canPlayCount < this.allVideo.length) {
            canPlayCount++;
        }
        if(canPlayCount >= this.allVideo.length) {
            videoCanType = true;
        }
        if (canPlayCount > this.allVideo.length) {
            videoCanType = false;
            return;
        }
    }, this));

    this.sound.on('canplay canplaythrough', $.proxy(function () {
        soundCanType = true;
    }, this));

    while(!(videoCanType && soundCanType)) {	// 조건에 맞을때까지 확인
        this.initLayout();
        this.soundFunc();
        this.allVideo.off('canplay canplaythrough');
        this.sound.off('canplay canplaythrough');
        return;
    }
}
```