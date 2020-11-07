const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-0'),
      messageA: document.querySelector('#scroll-section-0 .main-message.a'),
      messageB: document.querySelector('#scroll-section-0 .main-message.b'),
      messageC: document.querySelector('#scroll-section-0 .main-message.c'),
      messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      canvas: document.querySelector('#video-canvas-0'),
      context: document.querySelector('#video-canvas-0').getContext('2d'),
      videoImages: []
    },

    values: {
      videoImageCount: 300,
      imageSequence: [0, 299],
      canvas_opacity: [1, 0, {
        start: 0.9,
        end: 1
      }],
      messageA_opacity_in: [0, 1, {
        start: 0.1,
        end: 0.2
      }],
      messageB_opacity_in: [0, 1, {
        start: 0.3,
        end: 0.4
      }],
      messageC_opacity_in: [0, 1, {
        start: 0.5,
        end: 0.6
      }],
      messageD_opacity_in: [0, 1, {
        start: 0.7,
        end: 0.8
      }],
      messageA_translateY_in: [20, 0, {
        start: 0.1,
        end: 0.2
      }],
      messageB_translateY_in: [20, 0, {
        start: 0.3,
        end: 0.4
      }],
      messageC_translateY_in: [20, 0, {
        start: 0.5,
        end: 0.6
      }],
      messageD_translateY_in: [20, 0, {
        start: 0.7,
        end: 0.8
      }],
      messageA_opacity_out: [1, 0, {
        start: 0.25,
        end: 0.3
      }],
      messageB_opacity_out: [1, 0, {
        start: 0.45,
        end: 0.5
      }],
      messageC_opacity_out: [1, 0, {
        start: 0.65,
        end: 0.7
      }],
      messageD_opacity_out: [1, 0, {
        start: 0.85,
        end: 0.9
      }],
      messageA_translateY_out: [0, -20, {
        start: 0.25,
        end: 0.3
      }],
      messageB_translateY_out: [0, -20, {
        start: 0.45,
        end: 0.5
      }],
      messageC_translateY_out: [0, -20, {
        start: 0.65,
        end: 0.7
      }],
      messageD_translateY_out: [0, -20, {
        start: 0.85,
        end: 0.9
      }]
    }
  },
  {
    // 1
    type: 'normal',
    // heightNum: 5, // normal인 경우는 자신의 높이로 셋팅하면 되므로 주석 처리
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-1')
    }
  },
  {
    // 2
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-2'),
      messageA: document.querySelector('#scroll-section-2 .a'),
      messageB: document.querySelector('#scroll-section-2 .b'),
      messageC: document.querySelector('#scroll-section-2 .c'),
      pinB: document.querySelector('#scroll-section-2 .b .pin'),
      pinC: document.querySelector('#scroll-section-2 .c .pin'),
      canvas: document.querySelector('#video-canvas-1'),
      context: document.querySelector('#video-canvas-1').getContext('2d'),
      videoImages: []
    },
    values: {
      videoImageCount: 960,
      imageSequence: [0, 959],
      canvas_opacity_in: [0, 1, {
        start: 0,
        end: 0.1
      }],
      canvas_opacity_out: [1, 0, {
        start: 0.95,
        end: 1
      }],
      messageA_translateY_in: [20, 0, {
        start: 0.15,
        end: 0.2
      }],
      messageB_translateY_in: [30, 0, {
        start: 0.6,
        end: 0.65
      }],
      messageC_translateY_in: [30, 0, {
        start: 0.87,
        end: 0.92
      }],
      messageA_opacity_in: [0, 1, {
        start: 0.25,
        end: 0.3
      }],
      messageB_opacity_in: [0, 1, {
        start: 0.6,
        end: 0.65
      }],
      messageC_opacity_in: [0, 1, {
        start: 0.87,
        end: 0.92
      }],
      messageA_translateY_out: [0, -20, {
        start: 0.4,
        end: 0.45
      }],
      messageB_translateY_out: [0, -20, {
        start: 0.68,
        end: 0.73
      }],
      messageC_translateY_out: [0, -20, {
        start: 0.95,
        end: 1
      }],
      messageA_opacity_out: [1, 0, {
        start: 0.4,
        end: 0.45
      }],
      messageB_opacity_out: [1, 0, {
        start: 0.68,
        end: 0.73
      }],
      messageC_opacity_out: [1, 0, {
        start: 0.95,
        end: 1
      }],
      pinB_scaleY: [0.5, 1, {
        start: 0.6,
        end: 0.65
      }],
      pinC_scaleY: [0.5, 1, {
        start: 0.87,
        end: 0.92
      }]
    }
  },
  {
    // 3
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-3'),
      canvasCaption: document.querySelector('.canvas-caption'),
      canvas: document.querySelector('.image-blend-canvas'),
      context: document.querySelector('.image-blend-canvas').getContext('2d'),
      imagesPath: [
        './images/blend-image-1.jpg',
        './images/blend-image-2.jpg'
      ],
      images: []
    },
    values: {
      rect1X: [0, 0, { start: 0, end: 0 }],
      rect2X: [0, 0, { start: 0, end: 0 }],
      blendHeight: [ 0, 0, { start: 0, end: 0 } ],
      canvas_scale: [ 0, 0, { start: 0, end: 0 } ],
      canvasCaption_opacity: [ 0, 1,  { start: 0, end: 0 }],     // start, end는 js로 조정
      canvasCaption_translateY: [ 20, 0,  { start: 0, end: 0 }],  // 20% 아래에서 0의 위치로 이동
      rectStartY: 0
    }
  }
];