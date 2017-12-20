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

#### 이슈
currentTime을 찍어보면 0,1,2,...와 같이 균일하지 않고, 아래와 같이 1초 간격을 쪼개어 나타난다.
특정영역에서 멈추고, 다시 재생할때 정수 단위가 아닌 소수점 단위로 멈추기 때문에 원하는 시간에 멈추지 않는 이슈가 있다.
```
0.102496
0.353175
0.852006
1.102189 	// 1.000000 같은 정확한 시간을 거의 찍지 않는다.
1.352368
1.852265
2.352242
2.60238
2.852537
```
그럴땐, 영상 제작팀에 멈춰야하는 시간대에 1초간 delay를 달라고 해야하며,<br>
1초 이내에는 반드시 멈추기 때문에 부서간 협의가 반드시 필요하다.

특정 시간대 재생하려면 아래와 같이 한다.
```
video[0].currentTime = 2	//2초에 현재 시간을 설정한다.
video[0].play();	// 재생한다.
```

##### 작업
qa.hivelab.co.kr:4000/bluehole_guide/12_interactive.html

##### 리얼
https://air.bluehole.net/beginnerguide.do