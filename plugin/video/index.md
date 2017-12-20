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
#### 특정 시간대 재생하려면 아래와 같이 한다.
```
video[0].currentTime = 2	//2초에 현재 시간을 설정한다.
video[0].play();	// 재생한다.
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

#### 재생시간을 체크해주는 이벤트 : timeupdate
video 컨트롤 할때 유용하게 사용할 수 있는 이벤트이다.<br>
setInterval과 같이 비디오 재생을 계속 체크해주는 html5 video에서 제공하는 이벤트인데, interval만큼 부담스러운 이벤트는 아니다.
```
this.ingVideo.on("timeupdate", $.proxy(function () {
	// 함수내용
});

this.ingVideo.off("timeupdate");	// 이벤트를 다 사용했다면, double 체크가 되지 않도록 off 시켜준다.
```

#### 이슈
##### 문제
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
##### 해결
위의 경우는 네트웍 환경이나 사용자 마다 다르게 나타나고 프레임을 찍는 횟수가 불규칙하기 때문에
1) 프레임을 동일하게 맞출 수 있는 방법을 모색하거나,<br>
2) 영상 제작팀에 멈춰야하는 시간대에 1초간 delay를 주도록 하는 것이 좋다. (1초 안에는 반드시 멈추기 때문)<br>


##### 작업
http://qa.hivelab.co.kr:4000/bluehole_guide/12_interactive.html

##### 리얼
https://air.bluehole.net/beginnerguide.do