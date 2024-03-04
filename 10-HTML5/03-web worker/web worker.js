
// setInterval(() => {
//   postMessage(Date.now());
// },2000)

let f = (n) => {
  if (n < 2) {
    return 1;
  }
  return f(n - 1) + f(n - 2);
};
// 2.子向父传递 不需要添加 w.xxx
onmessage = (event) => {
  // 3.postMessage() 用于向html传回消息
  postMessage(f(event.data));
}


