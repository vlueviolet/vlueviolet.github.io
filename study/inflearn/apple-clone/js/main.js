(() => {

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section) 인덱스
  let enterNewScene = false; // 새로운 씬이 시작된 순간 true 처리


  const setCanvasImages = () => {
    let imgElem;
    for (let i = 0, max = sceneInfo[0].values.videoImageCount; i < max; i++) {
      imgElem = new Image(); // same => document.createElement('image');
      imgElem.src = `./video/001/IMG_${6726+i}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
    let imgElem2;
    for (let i = 0, max = sceneInfo[2].values.videoImageCount; i < max; i++) {
      imgElem2 = new Image(); // same => document.createElement('image');
      imgElem2.src = `./video/002/IMG_${7027+i}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }
    let imgElem3;
    for (let i = 0, max = sceneInfo[3].objs.imagesPath.length; i < max; i++) {
      imgElem3 = new Image(); // same => document.createElement('image');
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  };

  setCanvasImages();

  const setLayout = () => {
    for (let i = 0, max = sceneInfo.length; i < max; i++) {
      // window는 생략 가능
      // 각 스크롤 섹션의 높이 세팅
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        // normal인 경우, 콘텐츠 높이를 그대로 반영
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 1080; // canvas 높이 대비 window의 높이
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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

    if (values.length === 3) {
      // 해당 섹션 내 부분 스크롤
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      // start ~ end 사이 또는 범위 밖일때 value 처리ㄴ
      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
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
    const values = sceneInfo[currentScene].values; // 값
    const objs = sceneInfo[currentScene].objs; // DOM 객체
    const currentYOffset = yOffset - prevScrollHeight; // 현재 활성화 섹션 기준으로 얼만큼 스크롤 되었는지
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight; // 현재 씬에서 얼만큼 스크롤 했는지

    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset)); // image index를 위한 변수
        objs.context.drawImage(sceneInfo[0].objs.videoImages[sequence], 0, 0); // canvas에 그리기
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }
        break;
      case 2:
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if(scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset)
        } else {
          // out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)
        }

        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        break;

      case 3:
        let step = 0;
        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }


        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        

        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight; // 창 사이즈의 절반정도에서 시작되도록
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15; // 15% 너비
        // 왼쪽 박스
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2; // 전체 canvas.width에서 재계산된 canvas 너비를 빼면, crop된 전체 canvas의 짜투리 영역만 남는다. 그 너비의 50%로하면, 왼쪽 박스의 초기 x 위치값이 나온다.
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth; // animation이 끝나는 최종값, 초기값인 [0] - box1 너비를 뺸 값
        // 오른쪽 박스
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth; // rect1X[0]과 재계산된 canvas 너비를 더한 위치에서 자신의 너비를 뺀 값이 animation 시작 위치이다.
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth; // rect2X[0] 초기 위치에서 자신의 너비를 더하면, animation이 끝나는 위치를 구할 수 있다.

        // // 좌우 흰색 박스 그리기
        // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );

        // if (scrollRatio < values.rect1X[2].end) {
        //   step = 1;
        //   objs.canvas.classList.remove('sticky');
        // } else {
        //   step = 2;
        //   // 이미지 블렌드
        //   // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
        //   values.blendHeight[0] = 0;
        //   values.blendHeight[1] = objs.canvas.height;
        //   values.blendHeight[2].start = values.rect1X[2].end;
        //   values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
        //   const blendHeight = calcValues(values.blendHeight, currentYOffset);

        //   objs.context.drawImage(objs.images[1],
        //     0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
        //     0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
        //   );

        //   objs.canvas.classList.add('sticky');
        //   objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

        //   if (scrollRatio > values.blendHeight[2].end) {
        //     values.canvas_scale[0] = canvasScaleRatio;
        //     values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
        //     values.canvas_scale[2].start = values.blendHeight[2].end;
        //     values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

        //     objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
        //     objs.canvas.style.marginTop = 0;
        //   }

        //   if (scrollRatio > values.canvas_scale[2].end &&
        //     values.canvas_scale[2].end > 0) {
        //     objs.canvas.classList.remove('sticky');
        //     objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

        //     values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
        //     values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
        //     values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
        //     values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
        //     objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
        //     objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
        //   }
        // }

        break;
    }
  };

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0, max = currentScene; i < max; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // TODO: 이건 무슨 경우야?
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    // TODO: 이건 무슨 경우야?
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; // iOS 상단 바운스 대응
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // 씬이 바뀌는 순간 이상한 값(비율 값이 ㄴ음수 또는 이전 섹션의 큰 값)이 들어오는 것을 방지하기 위해, 씬이 바뀌는 순간에만 return 처리함
    if (enterNewScene) return;
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
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0); // 초기 로딩시 canvas에 그리기
  }); // asset들까지 load된 후 실행
  window.addEventListener('resize', setLayout);
})();