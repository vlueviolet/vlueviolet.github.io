let processor = {
  timerCallback: function() {
    if(this.video.paused || this.video.ended) return;

    this.computeFrame();
    let self = this;
    setTimeout(() => {
      this.timerCallback();
    });
  },
  doLoad: function() {
    this.video = document.querySelector('#video');
    this.normal = document.querySelector('#normal');
    this.narmalContext = this.normal.getContext('2d');
    this.transparent = document.querySelector('#transparent');
    this.transparentContext = this.transparent.getContext('2d');

    // var outputCanvas = document.getElementById('output'),
    //     output = outputCanvas.getContext('2d'),
    //     bufferCanvas = document.getElementById('buffer'),
    //     buffer = bufferCanvas.getContext('2d'),
    //     video = document.getElementById('video'),
    //     width = outputCanvas.width,
    //     height = outputCanvas.height,
    //     interval;
    
    this.video.addEventListener('play', () => {
      this.width = 150;
      this.height = 300;
      this.timerCallback();
    });
  },
  computeFrame: function() {
    this.narmalContext.drawImage(this.video, 0, 0, this.width, this.height);

    var image = this.narmalContext.getImageData(0, 0, transparent.width, transparent.height),
        imageData = image.data,
        alphaData = this.narmalContext.getImageData(0, transparent.height, transparent.width, transparent.height).data;

    let frame = this.narmalContext.getImageData(0, 0, this.width, this.height);
    let max = frame.data.length / 4;

    for(let i=0 ; i<max ; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if(g > 100 && r < 100) frame.data[i * 4 + 3] = 0;
    }
    for (let i = 3, len = imageData.length; i < len; i = i + 4) {
      imageData[i] = alphaData[i - 1];
    }

    // green, red 처리
    // this.transparentContext.putImageData(frame, 0, 0);
    
    // 전체 opacity
    this.transparentContext.putImageData(image, 0, 0);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  processor.doLoad();
});