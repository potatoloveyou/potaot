<template>
  <div class="playListViews">
    <header>
      <div class="card">
        <img :src="playLists.coverImgUrl" alt="song.name" />
        <span>歌单</span>
        <figure class="figure-svg earImg">
          <i class="i-svg"></i>
          xxx
        </figure>
      </div>
      <div class="details">
        <h2 class="name">{{ playLists.name }}</h2>
        <div class="userInformation">
          <img src="" alt="" />
          <span class="userName"></span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { getPlayList } from '@/apis/api';
export default {
  name: 'PlayListViews',
  data() {
    return {
      playLists: {},
    };
  },

  // 法一 在created时调用axios
  created() {
    // console.log(this.$route.query.id);
    getPlayList(this.$route.query.id).then((res) => {
      this.playLists = res.data.playlist;
    });
  },

  // 法二 在beforeRouteEnter路由进入时调用axios
  // 路由进入时
  // 在渲染该组件的对应路由被 confirm 前调用
  // async beforeRouteEnter(to, from, next) {
  //   try {
  //     const res = await getPlayList(to.query.id);
  //     next((vm) => {
  //       vm.playLists = res.data.playlist;
  //     });
  //   } catch (error) {
  //     console.error('Failed to get playlist:', error);
  //   }
  // },
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 200rem;
  padding: 20rem 14rem;
  background-color: rgba(255, 0, 0, 0.2);
  display: flex;
  align-items: center;
  .card {
    width: 126px;
    height: 126px;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    span {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 0 8px;
      color: #fff;
      font-size: 9px;
      text-align: center;
      line-height: 17px;
      background-color: rgba(217, 48, 48, 0.8);
      border-radius: 0 17rem 17rem 0;
    }
    figure.earImg {
      color: #fff;
      font-size: 12px;
      position: absolute;
      top: 0;
      right: 0;
      i {
        width: 12rem;
        height: 12rem;
        background-image: url(@/assets/imgs/svg/ear.svg);
      }
    }
  }

  .details {
    height: 126px;
    margin-left: 16rem;
    flex: 1;
    h2.name {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      // white-space: nowrap; // 防止文字换行
      overflow: hidden; // 隐藏超出部分
      font-size: 17px;
      color: #fefefe;
      height: 44px;
    }
  }
}
</style>
