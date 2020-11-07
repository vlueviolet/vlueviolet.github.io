// import * as math from './main';

// const num = math.sum(1, 2);
// console.log(num);

import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}">
  `;
});