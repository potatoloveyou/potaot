export default defineNuxtRouteMiddleware((to, from) => {
  console.log("my-two");
  // console.log(to, from);
  // return false; // 中断导航
});
