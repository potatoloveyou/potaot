import _ from 'lodash';
// import './style.css';
import './style.less';
import Icon from './1.jpg';
import printMe from './print.js';

console.log(printMe);

function component() {
  const element = document.createElement('div');

  // // lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // lodash 现在使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  myIcon.addEventListener('click', printMe);

  return element;
}

document.body.appendChild(component());