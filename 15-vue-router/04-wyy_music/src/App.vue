<template>
  <div id="app">
    <section class="top" v-if="$route.meta.isShowApp">
      <section class="title-download">
        <figure class="topLogo figure-svg">
          网易云音乐
          <i class="i-svg"></i>
        </figure>
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
    <router-view @play-Song="playSong" />

    <SimpleSongPlay :song="song" :isPlaying="isPlaying" v-if="song" @switch-Play="switchPlay"></SimpleSongPlay>
  </div>
</template>

<script>
import SimpleSongPlay from '@/components/SongPlay/SimpleSongPlay.vue';
export default {
  name: 'App',

  components: {
    SimpleSongPlay,
  },

  data() {
    return {
      // 由NewSongList组件传递过来的数据
      song: null,

      // 是否正在播放歌曲的标志位
      isPlaying: false,
    };
  },

  methods: {
    // 接收NewSongList组件传递过来的数据
    playSong(song) {
      this.song = song;
    },
    switchPlay() {
      this.isPlaying = !this.isPlaying;
    },
  },

  computed: {
    // 计算属性，用于获取当前路由的名称
    currentRouteName() {
      return this.$route.name;
    },
  },

  watch: {
    song(newSong) {
      console.log('newSong', newSong);
    },
    isPlaying(newisPlaying){
      console.log(newisPlaying);
    }
  },

  // 组件内路由守卫
  // 路由进入时
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log('App to', to);
  //   next();
  // },

  // 路由更新时
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  // },

  // 路由离开时
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  // },
};
</script>

<style lang="less">
// 全局样式

// svg的全局样式
.figure-svg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.i-svg {
  display: block;
  background-position: 0 0;
  background-size: contain;
  background-repeat: no-repeat;
}

// 分界线

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16rem;
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    .title-download {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85rem;
      background-color: #d43c33;
      padding: 0 10rem;
      opacity: 0.3;
      figure.topLogo {
        color: #fff;
        font-size: 20rem;
        i {
          width: 142px;
          height: 25px;
          background-image: url(@/assets/imgs/svg/topLogo.svg);
        }
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
  }
  audio {
    position: fixed;
    bottom: 0;
  }
}
</style>
