<template>
  <div id="app">
    <section class="top" v-if="$route.meta.isShowApp">
      <section class="title-download">
        <h1 class="title">
          <img src="" alt="" />
          网易云音乐
        </h1>
        <div class="download">
          <span>下载APP</span>
        </div>
      </section>
      <nav>
        <router-link to="/">推荐音乐</router-link>
        <router-link to="/HotSongChartViews">热歌榜</router-link>
        <router-link to="/SearchViews">搜索</router-link>
      </nav>
    </section>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  // 组件内路由守卫
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log('App to', to);
  //   next();
  // },
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  // },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16rem;
  // background-image: url('https://s3.music.126.net/mobile-new/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922=');
}

.top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.title-download {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85rem;
  background-color: #d43c33;
  padding: 0 10rem;
  // opacity: 0.3;

  .title {
    color: #fff;
    font-size: 20rem;
  }
  .download {
    color: #d43c33;
    background-color: #fff;
    border-radius: 37.5% / 100%;

    span {
      line-height: 36rem;
      padding: 0 16rem;
    }
  }
}

nav {
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 2rem 0px rgb(208, 208, 208);
  background-color: #fff;
  a {
    color: #2c3e50;
    text-decoration: none;
    line-height: 40rem;
    padding: 0 5rem;

    &.router-link-exact-active {
      color: #dd001b;
      border-bottom: 3rem solid #dd001b;
    }
  }
}
</style>
