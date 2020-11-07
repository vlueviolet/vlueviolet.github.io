class Panel {
  constructor() {
    this.scale = 0;
  };

  draw = () => {
    context.fillStyle='rgba(255, 0, 0, .7)';

    context.resetTransform(); // 변환 초기화
    context.translate(oX, oY);  // 중심점 변경
    context.scale(this.scale, this.scale);
    context.translate(-oX, -oY);    // 중심점 되돌리기
    context.fillRect(oX-150, oY-150, 300, 300);
    context.resetTransform(); // 변환 초기화
  };
  
  showContent = () => {
    context.fillStyle='#fff';
    context.fillText(selectedBox.index, oX, oY);
  };
}