(() => {

  let yOffset = 0;  // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section) 인덱스

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
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
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  // 각 스크롤 섹션의 높이 세팅
  const setLayout = () => {
    for(let i=0, max=sceneInfo.length ; i<max ; i++) {
      // window는 생략 가능
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
  }

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for(let i=0, max=currentScene ; i<max ;i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      // document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(yOffset < prevScrollHeight) {
      if(currentScene === 0) return;  // iOS 상단 바운스 대응
      currentScene--;
      // document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };
  
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  /** DOM 구조 load된 후 실행
   * load에 비해 시작이 빠름
   */
  // window.addEventListener('DOMContentLoaded',setLayout);
  window.addEventListener('load',setLayout);  // asset들까지 load된 후 실행
  window.addEventListener('resize', setLayout);
})();