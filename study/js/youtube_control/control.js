<script type="text/javascript">
$(function () {
  $('.visual_area').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear'
  });
  // window.commonLayer.layerView('.ly_wrap');
});

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videoId = '';
function onYouTubeIframeAPIReady() {
    player = new YT.Player('main_video', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      },
      playerVars: {
          controls: '0',
          showinfo: '0',
        rel: '0',
      },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if(event.data == YT.PlayerState.ENDED){
    event.target.playVideo();
  }else if(event.data == YT.PlayerState.BUFFERING){
    window.BlueHole.fadeTarget.fadeOutTarget('.load_video');
  }
}
function stopVideo() {
  player.stopVideo();
}
</script>