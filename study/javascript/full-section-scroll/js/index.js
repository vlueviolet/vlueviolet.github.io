var interaction = {
  init: function () {
    this.setElements();
    this.initLayout();
    this.bindEvents();
  },
  setElements: function () {
    this.section = [...document.querySelectorAll('section')];
    this.btnTop = document.querySelector('.btn-top');
  },
  initLayout: function () {
    this.initOpts();
    this.setObserver();
    this.getCurrentIndex();
  },
  initOpts: function () {
    this.sectionOffsetHeight = this.section.map((item, index) => {
      return index * item.scrollHeight;
    });
    this.currentIndex = 0;
    this.options = {
      rootMargin: '0px',
      threshold: [0, 0.5, 0.9]
    }
    this.lastScrollTop = 0;
    this.direction = null;
    this.isMoving = false;
    this.isAnimatedDone = true;
    this.isScrolling = false;
    this.rafId = null;
  },
  bindEvents: function () {
    document.getElementById('content').addEventListener('scroll', this.handleScroll.bind(this), false);
    document.getElementById('content').addEventListener('mousewheel', this.handleMouse.bind(this), { passive: false });
    this.btnTop.addEventListener('click', this.handleClick);
  },
  handleMouse: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var self = this;
    console.log(this.isMoving);
    if (this.isMoving) return;
    this.isMoving = true;
    this.isScrolling = true;
    console.log('mouse', this.isScrolling);

    
    if(e.deltaY > 0) this.direction = 'down';
    else this.direction = 'up';
    
    this.setCurrentIndex();
    this.moveSection();

    clearTimeout(this.timer2);
    this.timer2 = setTimeout(() => {
      this.isScrolling = false;
      console.log('mouse end', this.isMoving, this.isScrolling);
    }, 300);
  },
  handleScroll: function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    // if(this.isMoving) return;
    console.log('scroll', this.isMoving, this.isScrolling);
    // this.scrollY = e.target.scrollTop;
    // this.getCurrentIndex();

    // if(this.scrollY > 0) {
    //   this.btnTop.classList.add('is-active');
    // } else {
    //   this.btnTop.classList.remove('is-active');
    // }

    // st = this.scrollY;
    // if (st < this.lastScrollTop) {
    //   this.direction = 'down';
    // } else {
    //   this.direction = 'up';
    // }
    // this.lastScrollTop = st;

    // debounce
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isMoving = false;
      console.log('scroll done', this.isMoving, this.isScrolling);
      return false;
    }, 300);
  },
  handleClick: function(e) {
    e.preventDefault();
    if($('html, body').is(':animated')) return;
    $('html, body').animate({ scrollTop: 0 }, 300);
  },
  setCurrentIndex: function() {
    if(this.direction === 'up') {
      this.currentIndex--;
      if(this.currentIndex <= 0) {
        this.currentIndex = 0;
      }
    } else {
      this.currentIndex++;
      if(this.currentIndex >= this.section.length-1) {
        this.currentIndex = this.section.length;
      }
    }
    console.log('index: ', this.currentIndex);
  },
  getCurrentIndex: function () {
    for (let i = 0, max = this.section.length; i < max; i++) {
      if (this.scrollY <= this.sectionOffsetHeight[i]) {
        this.currentIndex = i;
        break;
      }
    }
    document.body.dataset.currentIndex = this.currentIndex;
  },
  setObserver: function () {
    this.observer = new IntersectionObserver(this.animationSection, this.options);

    this.section.forEach((section, index) => {
      this.observer.observe(section);
    });
  },
  animationSection: function (entries) {
    entries.forEach((entry) => {
      const {
        target
      } = entry;
      const isAbove = entry.boundingClientRect.y < entry.rootBounds.y;
      if (entry.intersectionRatio >= 0.5) {
        target.classList.add("is-visible");
      } else {
        target.classList.remove("is-visible");
      }
    })
  },
  moveSection: function () {
    var self = this;
    if(!this.isAnimatedDone) return;
    this.isAnimatedDone = false;
    $('#content').stop().animate(
      {
        scrollTop: `${this.sectionOffsetHeight[this.currentIndex]}px`
      },
      {
        duration: 300,
        complete: function () {
          if(!self.isScrolling) {
            self.isMoving = false;
          }
          // self.isAnimatedDone = true;
          console.log('done', self.isMoving, self.isScrolling);
          // return false;
        }
      }
    );
  }
};

interaction.init();