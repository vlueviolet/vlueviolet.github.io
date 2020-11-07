// box를 그리는 클래스
class Box {
  constructor(index, x, y, speed) {
    // 파라메터 재정의
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;

    // box 사이즈
    this.width = 100;
    this.height = 100;

    // draw함수 실행
    this.draw();
  };

  draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, .5)';
    context.fillRect(this.x, this.y, 100, 100);
    context.fillStyle = '#fff';
    context.fillText(this.index, this.x+30, this.y+30);
  };
}