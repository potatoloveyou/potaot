// var fs = require("node:fs");
/* 
同步api
*/
// console.log("代码开始");

// var data = fs.readFileSync("./input.txt");
// // readFileSync 同步读取
// console.log(data.toString());
// // 读取文件是以二进制读取 buffer
// console.log("代码结束");

/* 异步api */
// console.log("代码开始");
// // nodejs API一般情况都有 同步异步两个版本 异步一般情况回调函数是最后一个 携带两个参数（err，data）
// fs.readFile("./input.txt", function (err, data) {
//   console.log(data.toString());
// });
// console.log("代码结束");

var fs = require("node:fs/promises");
/*
fs promise
 */

// console.log("代码开始");
// // var p = fs.readFile("./input.txt");
// // console.log(p);
// fs.readFile("./input.txt").then((res) => {
//   console.log(res.toString());
// });
// console.log("代码结束");

/* promise + async await */
(async function () {
  console.log("代码开始");
  // var p = fs.readFile("./input.txt");
  // console.log(p);
  var data = await fs.readFile("./input.txt");
  console.log(data.toString());

  console.log("代码结束");
})();
