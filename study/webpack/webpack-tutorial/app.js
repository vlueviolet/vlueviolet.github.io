import './css/style.css';

const button = document.querySelector('button');
const box = document.querySelector('div');
let isShow = true;
button.addEventListener('click', function () {
  isShow = !isShow;
  if (isShow) {
    box.style.display = 'block'
  } else {
    box.style.display = 'none'
  }
});