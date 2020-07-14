let airPot = (function() {
  return {
    init: function() {
      this.setElements();
      this.initLayout();
      this.bindEvents();
    },
    setElements: function() {
      this.section1 = document.querySelector('.section-top');
      this.canvas1 = this.section1.querySelector('.canvas');
      this.context1 = this.canvas1.getContext('2d');
    },
    bindEvents: function() {
      window.addEventListener('scroll', this.handleScroll);
    },
    initLayout: function() {
      this.canvas1.width = window.innerWidth;
      this.canvas1.height = window.innerHeight;
      this.sequence = 0;
      this.loadImage(DATA.SECTION_01);
      this.setScrollHeight();
      this.context1.drawImage(this.imageArray01[0], 0, 0);
      this.playAnimation();
    },
    loadImage: function(data) {
      let { id, url, count, startIndex} = data;
      this[`imageArray${id}`] = [];
      let image;

      for(let i=0, max=count ; i<max ; i++) {
        image = new Image();
        image.src = `${url}/${this.transformDigit(i, 4)}.jpg`;
        this[`imageArray${id}`].push(image);
      }
    },
    setScrollHeight: function() {
      DATA.SECTION_01.scrollHeight = this.section1.offsetHeight;
    },
    playAnimation: function() {
      if(!this.sequence) this.sequence = 0;
      this.sequence = Math.round([window.pageYOffset/(DATA.SECTION_01.scrollHeight - window.innerHeight)]*DATA.SECTION_01.count);
      
      if(this.sequence < 0) {
        this.sequence = 0;
      } else if(this.sequence >= DATA.SECTION_01.count) {
        this.sequence = DATA.SECTION_01.count;
      }

      this.context1.drawImage(this.imageArray01[this.sequence], 0, 0);

      requestAnimationFrame(() => {
        this.playAnimation();
      });
    },
    handleScroll: function() {
      
    },
    transformDigit: function(number, width) {
      number = number + '';
      return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
    }
  };
})();

window.addEventListener('load', airPot.init());