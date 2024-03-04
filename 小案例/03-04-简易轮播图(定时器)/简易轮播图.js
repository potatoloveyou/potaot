const swiper = document.querySelector('.list');
const imgs = swiper.querySelectorAll('img');
const options = document.querySelector('.option').querySelectorAll('li');

// console.log(imgs);

// 初始化
function start(n) {
  for (let i = 0; i < imgs.length; i++) {
    if (i == n) {
      imgs[i].style.opacity = '1';
      options[i].style.backgroundColor = 'red';
    } else {
      imgs[i].style.opacity = '0';
      options[i].style.backgroundColor = 'orange';
    }
  }
  return n;
  // console.log(n);
}
// 调用函数 初始化显示第几张 高亮哪一个
// 函数return出来的结果
var current = start(0);

// console.log(current);


// 所有dot添加事件
// debugger
for (let i = 0; i < imgs.length; i++) {
  // 给所有li的title添加序号
  options[i].title = i;

  // 给所有li添加点击事件
  options[i].onclick = function () {
    // console.log(this.title);
    current = start(this.title);
    console.log(current);
  };
}


const btn = document.querySelector('.control').querySelectorAll('button');

// 前进
function forward() {
  current++;
  // 当图片为最后一张的时候再按一次变为第一张
  if (current >= imgs.length) {
    current = 0;
  }
  start(current);
}

// 后退
function backward() {
  current--;
  if (current < 0) {
    current = imgs.length - 1;
  }
  start(current);
}

// debugger
for (let i = 0; i < btn.length; i++) {
  // 给所有button的title添加序号
  btn[i].title = i;
  btn[i].onclick = function () {
    console.log(this);
    if (this.title == 0) {
      backward();
    } else if (this.title == 1) {
      forward();
    }
  };
}


// 定时器
// setTimeout(回调函数, timeout);
setTimeout(() => {
  // console.log(123);
}, 300);

setInterval(() => {
  forward();
}, 1000);
