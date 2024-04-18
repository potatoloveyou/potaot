<!-- 3.设置好RecommendedMusicViews文件名 -->
<template>
  <div class="recommendedMusicViews">
    <h3>编辑推荐</h3>
    <RecommendationList :personalizeds="personalizeds"></RecommendationList>
    <h3>最新音乐</h3>
    <NewSongList :newsongs="newsongs"></NewSongList>
    <footer>
      <div class="footer-content">
        <div class="logo">
          <img src="" alt="" />
          <h1>网易云音乐</h1>
        </div>
        <a>
          <div class="openApp">打开APP，发现更多好音乐 ></div>
        </a>
        <div class="copyright">网易公司版权所有©1997-2024 杭州乐读科技有限公司运营</div>
      </div>
    </footer>
  </div>
</template>

<script>
// import axios from 'axios';
import RecommendationList from '../components/RecommendedMusic/RecommendationList.vue';
import NewSongList from '../components/RecommendedMusic/NewSongList.vue';
import { getRecommendationList, getNewSongList } from '@/apis/api';

export default {
  // name: 'RecommendedMusic',
  // 4. 设置好RecommendedMusicViews名字
  name: 'RecommendedMusicViews',

  components: {
    RecommendationList,
    NewSongList,
  },

  data() {
    return {
      personalizeds: [],
      newsongs: [],
    };
  },

  created() {
    // 获取编辑推荐歌单
    // Promise.all([])  Promise.all()第一个参数为数组，当实例在所有Promise实例都成功后才会成功，否则失败。
    Promise.all([getRecommendationList(), getNewSongList()]).then(([personalized, newsong]) => {
      this.personalizeds = personalized.data.result;
      this.newsongs = newsong.data.result;
    });
  },
};
</script>

<!-- scoped用于限制css样式的作用范围 -->
<style lang="less" scoped>
.recommendedMusicViews {
  margin-top: 125rem;

  h3 {
    padding: 15rem 0 15rem 10rem;
    line-height: 16rem;
    position: relative;
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      display: block;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }

  footer {
    position: relative;
    // padding-top: 54%;
    height: 200rem;
    background-image: url('https://s3.music.126.net/mobile-new/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922=');
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    .footer-content {
      position: absolute;
      .logo {
        font-weight: bold;
        font-size: 36rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .openApp {
        // line-height: 38rem;
        padding: 10rem 30rem;
        border: 1rem solid #d33a31;
        border-radius: 38rem;
        font-size: 16rem;
        color: #d33a31;
        margin: 15rem 37rem 5rem;
      }
      .copyright {
        color: #888;
        font-size: 12px;
        line-height: 16px;
        transform: scale(0.75);
        text-align: center;
      }
    }
  }
}
</style>
