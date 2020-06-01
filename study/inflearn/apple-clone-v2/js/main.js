(() => {

  let yOffset = 0;  // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section) 인덱스
  let enterNewScene = false;  // 새로운 씬이 시작된 순간 true 처리

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
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2}],
        messageA_translateY_in: [20, 0,  { start: 0.1, end: 0.2}],  // 시작 위치, 끝 위치, 타이밍
        // messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4}],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3}],
        messageA_translateY_out: [0, -20,  { start: 0.25, end: 0.3}],  // 시작 위치, 끝 위치, 타이밍
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

  const setLayout = () => {
    for(let i=0, max=sceneInfo.length ; i<max ; i++) {
      // window는 생략 가능
      // 각 스크롤 섹션의 높이 세팅
      if(sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if(sceneInfo[i].type === 'normal') {
        // normal인 경우, 콘텐츠 높이를 그대로 반영
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight; 
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for(let i=0 ; i<sceneInfo.length ; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  /** 첫번째 섹션의 values를 계산하기 위한 함수
   * 
   * @param {*} values 
   * @param {*} currentYOffset 현재 섹션에서 얼만큼 스크롤 되었는지를 나타내는 양
   * 
   */
  const calcValues = (values, currentYOffset) => {
    let rv;
    
    // 현재 섹션에서 스크롤된 범위를 비율로 구함 (0~1)
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    if(values.length === 3) {
      // 해당 섹션 내 부분 스크롤
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start* scrollHeight;
      const partScrollEnd =  values[2].end* scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      
      // start ~ end 사이 또는 범위 밖일때 value 처리ㄴ
      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if(currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      // 해당 섹션의 전체 영역 대비 스크롤
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  };

  /**
   * 해당 섹션만 애니메이션 실행
   */
  const playAnimation = () => {
    const values = sceneInfo[currentScene].values;  // 값
    const objs = sceneInfo[currentScene].objs; // DOM 객체
    const currentYOffset = yOffset - prevScrollHeight;  // 현재 활성화 섹션 기준으로 얼만큼 스크롤 되었는지
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight; // 현재 씬에서 얼만큼 스크롤 했는지

    switch(currentScene) {
      case 0:
        if(scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;
    for(let i=0, max=currentScene ; i<max ;i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(yOffset < prevScrollHeight) {
      enterNewScene = true;
      if(currentScene === 0) return;  // iOS 상단 바운스 대응
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // 씬이 바뀌는 순간 이상한 값(비율 값이 ㄴ음수 또는 이전 섹션의 큰 값)이 들어오는 것을 방지하기 위해, 씬이 바뀌는 순간에만 return 처리함
    if(enterNewScene) return;
    playAnimation();
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