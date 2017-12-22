## Video/Audio jQuery 제어
<br><br>
###  Video/Audio 선택자 및 기본제어
#### Video
```
// 기본 선택자
var video = $('video');
this.video = this.wrap.find('video');
this.video.get(0).play();

// 또는
this.video = this.wrap.find('video');
this.video[0].play();
this.video[0].pause();
this.video[0].loop = true;

// Video 재생위치가 마지막일때
if(this.ingVideo[0].ended) {
    //조건문 실행문
}
```
<br><br>
#### Audio
```
// 기본 선택자
this.sound = this.wrap.find('audio');
this.sound[0].play();
this.sound[0].loop = true;

// 볼륨제어
this.sound.volume = 0.3;    // 0~1 사이값
this.sound.stop().animate({volume: 0.3}, 1000); // 0.3 크기로 1초 동안 볼륨 줄이기

// 1초 동안 소리 줄이고 다시 초기화
this.sound.stop().animate({volume: 0}, 1000, $.proxy(function () {
    this.sound[0].pause();
    this.sound[0].currentTime = 0;
    this.sound[0].volume = 1;
}, this));
```
#### 특정 시간대 재생하려면 아래와 같이 한다.
```
this.video[0].currentTime = 2   //2초에 현재 시간을 설정한다.
this.video[0].play();   // 재생한다.
```
<br><br>
#### 재생 확인 (사운드, 비디오 canplay 체크)
```
canPlayCheck : function () {
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
<br><br>
#### 재생시간을 체크해주는 이벤트 : timeupdate
video 컨트롤 할때 유용하게 사용할 수 있는 이벤트이다.<br>
setInterval과 같이 비디오 재생을 계속 체크해주는 html5 video에서 제공하는 이벤트인데, interval만큼 부담스러운 이벤트는 아니다.
```
this.ingVideo.on("timeupdate", $.proxy(function () {
    // 함수내용
});

this.ingVideo.off("timeupdate");    // 이벤트를 다 사용했다면, double 체크가 되지 않도록 off 시켜준다.
```
<br><br>
#### 이슈
##### 문제
currentTime을 찍어보면 0,1,2,...와 같이 균일하지 않고, 아래와 같이 1초 간격을 쪼개어 나타난다.
특정영역에서 멈추고, 다시 재생할때 정수 단위가 아닌 소수점 단위로 멈추기 때문에 원하는 시간에 멈추지 않는 이슈가 있다.
2초에 영상을 멈추게 하고 싶지만, 2.464501초에 멈추기때문에 영상은 0.464501초만큼 재생된 상태이다.

```
console.log(this.video[0].currentTime);
```
```
0.000674
0.214229
0.715187
0.965213
1.464997  // 1.000000 같은 정확한 시간을 거의 찍지 않는다.
1.964654
2.464501  // 2.000000 같은 정확한 시간을 거의 찍지 않는다.
2.714459
3.21438
3.464384
3.714384
3.964607
```
<br><br>
##### 해결
위의 경우는 네트웍 환경이나 사용자 마다 다르게 나타나고 프레임을 찍는 횟수가 불규칙하기 때문에
1) 프레임을 동일하게 맞출 수 있는 방법을 모색하거나,<br>
2) 영상 제작팀에 멈춰야하는 시간대에 1초간 delay를 주도록 하는 것이 좋다. (1초 안에는 반드시 멈추기 때문)<br>
<br><br>

#### Reference
* html5 비디오
Video https://www.w3schools.com/tags/ref_av_dom.asp
https://msdn.microsoft.com/ko-kr/library/hh924822(v=vs.85).aspx
https://msdn.microsoft.com/ko-kr/library/hh924820(v=vs.85).aspx
* 비디오 이벤트 확인
http://samples.msdn.microsoft.com/Workshop/samples/media/videoevents.htm
* 자바스크립트 비디오 제어
https://msdn.microsoft.com/ko-kr/library/hh924823
* 미디어 이벤트
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
* 프레임 제어 하는듯한 플러그인 (연구 필요)
https://github.com/allensarkisyan/VideoFrame

##### 테스트
http://qa.hivelab.co.kr:4000/bluehole_guide/guide_test/11_guide.html

##### 작업
http://qa.hivelab.co.kr:4000/bluehole_guide/12_interactive.html

##### 리얼
https://air.bluehole.net/beginnerguide.do