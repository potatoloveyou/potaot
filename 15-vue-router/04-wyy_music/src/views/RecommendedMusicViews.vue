<!-- 3.设置好RecommendedMusicViews文件名 -->
<template>
  <!-- <div class="RecommendedMusic"> -->
  <div class="RecommendedMusicViews">
    <h3>编辑推荐</h3>
    <ul class="recommendation-list">
      <RecommendationCard
        v-for="personalized in personalizeds"
        :personalized="personalized"
        :key="personalized.id"></RecommendationCard>
    </ul>
    <h3>最新音乐</h3>
    <ul class="latestSong-list">
      <SongItem v-for="newsong in newsongs" :newsong="newsong" :key="newsong.id"></SongItem>
    </ul>

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
import axios from 'axios';
import RecommendationCard from '../components/RecommendationCard.vue';
import SongItem from '../components/SongItem.vue';

export default {
  // name: 'RecommendedMusic',
  // 4. 设置好RecommendedMusicViews名字
  name: 'RecommendedMusicViews',

  components: {
    // HelloWorld,
    RecommendationCard,
    SongItem,
  },

  data() {
    return {
      personalizeds: [],
      newsongs: [],
    };
  },

  created() {
    // 获取编辑推荐歌单
    // console.log(axios);
    // axios
    //   .get('https://apis.netstart.cn/music/personalized', {
    //     params: {
    //       limit: 6,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data.result);
    //     this.personalizeds = res.data.result;
    //   });
    // axios
    //   .get('https://apis.netstart.cn/music/personalized/newsong', {
    //     params: {
    //       limit: 6,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data.result);
    //     this.personalizeds = res.data.result;
    //   });

    // Promise.all([])  Promise.all()第一个参数为数组，当实例在所有Promise实例都成功后才会成功，否则失败。
    Promise.all([
      axios.get('https://apis.netstart.cn/music/personalized', {
        params: {
          limit: 6,
        },
      }),
      axios.get('https://apis.netstart.cn/music/personalized/newsong', {
        params: {
          limit: 10,
        },
      }),
    ]).then(([personalized, newsong]) => {
      this.personalizeds = personalized.data.result;
      this.newsongs = newsong.data.result;
    });
  },
};
</script>

<!-- scoped用于限制css样式的作用范围 -->
<style lang="less" scoped>
// .RecommendedMusic {
.RecommendedMusicViews {
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
  ul.recommendation-list {
    display: grid;
    // columns列  repeat(3, 1fr) 3列 每列1fr
    // gap 列与列之间的间距
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2rem;
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
