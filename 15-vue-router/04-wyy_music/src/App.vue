<template>
  <div id="app">
    <section class="top">
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
  left: 0;
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
