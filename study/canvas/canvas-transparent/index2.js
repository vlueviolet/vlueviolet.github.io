var video = document.getElementById('testVideo');
var canvas = document.getElementById("testCanvas");
var context = canvas.getContext("2d");
var canvasGra = document.getElementById("testCanvasGra");
var contextGra = canvasGra.getContext("2d");

var vWidth, vHeight, vRate;
var graY;
var isStarted = false;

var pcUrl = './video/CHROMA_KEY_THANOS.mp4';
var mobileUrl = './video/CHROMA_KEY_THANOS.mp4';
var isMobile = false;

function setOpts() {
  vWidth = video.videoWidth || 1920;
  vHeight = video.videoHeight || 810;
  vRate = vWidth / vHeight;

  canvas.width = window.innerWidth;
  canvas.height = Math.ceil(vHeight / vWidth * window.innerWidth);

  graY = window.innerHeight - canvas.height;
  if (graY < 0) {
    $(canvasGra).hide();
  } else {
    $(canvasGra).show();
    canvasGra.width = window.innerWidth;
    canvasGra.height = graY;
  }

};

function animate(time) {
  context.drawImage(video, 0, 0, vWidth, vHeight, 0, 0, canvas.width, canvas.height);

  var frame = context.getImageData(0, 0, canvas.width, canvas.height);
  var frameLength = frame.data.length / 4;

  for (var i = 0; i < frameLength; i++) {
    var r = frame.data[i * 4 + 0];
    var g = frame.data[i * 4 + 1];
    var b = frame.data[i * 4 + 2];
    if (g < 50 && r < 50 && b < 50) {
      frame.data[i * 4 + 3] = 50;
    }
  }

  context.putImageData(frame, 0, 0);

  contextGra.clearRect(0, 0, canvasGra.width, canvasGra.height);
  var gradient = contextGra.createLinearGradient(canvasGra.width, 0, canvasGra.width, canvasGra.height);

  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  contextGra.fillStyle = gradient;
  contextGra.fillRect(0, 0, canvasGra.width, canvasGra.height);

  var rId = requestAnimationFrame(animate);
}

video.addEventListener('canplaythrough', function () {
  if (isStarted) return;

  setOpts();
  animate();
  isStarted = true;
});

window.addEventListener('load', function () {
  if ($('html').hasClass('mobile')) {
    isMobile = true;
    video.src = mobileUrl;
  } else {
    isMobile = false;
    video.src = pcUrl;
  }
});

window.addEventListener('resize', function () {
  setOpts();
});