<template>
  <div class="recommendationList">
    <ul>
      <li
        class="recommendationListCard"
        v-for="personalized in personalizeds"
        :key="personalized.id"
        @click="jumpPlaylistDetail(personalized.id)">
        <div class="img">
          <img :src="`${personalized.picUrl}?imageView=1&type=webp&thumbnail=370x0`" />
        </div>
        <h5>{{ personalized.name }}</h5>
        <figure class="figure-svg earImg">
          <i class="i-svg"></i>
          {{ numberFormat(personalized.playCount.toString()) }}
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecommendationList',
  props: {
    personalizeds: Array,
  },

  data() {
    return {
      // 缓存处理后的播放次数，避免重复计算
      playCount: {},
    };
  },

  methods: {
    numberFormat(playCount) {
      if (this.playCount[playCount]) return this.playCount[playCount]; // 避免重复计算
      playCount.length > 4
        ? (playCount = `${playCount.slice(0, playCount.length - 4)}.${playCount.slice(3, playCount.length - 4)}万`)
        : playCount.length > 7
        ? (playCount = `${playCount.slice(0, playCount.length - 7)}.${playCount.slice(6, playCount.length - 7)}亿`)
        : playCount;
      this.playCount[playCount] = playCount; // 缓存处理后的播放次数
      return playCount;
    },

    // 跳转至歌单详情页面
    jumpPlaylistDetail(personalizedId) {
      // this.$router.push({ path: '/PlayListViews' });
      this.$router.push({ path: '/PlayListViews', query: { id: personalizedId } });
    },
  },
};
</script>

<style lang="less" scoped>
.recommendationList {
  ul {
    display: grid;
    // columns列  repeat(3, 1fr) 3列 每列1fr
    // gap 列与列之间的间距
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2rem;
    .recommendationListCard {
      margin-bottom: 16rem;
      position: relative;
      .img {
        width: 100%;
        padding-top: 100%;
        position: relative;
        box-shadow: 0 0 10px 5px #888888 inset;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      h5 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        // white-space: nowrap; // 防止文字换行
        overflow: hidden; // 隐藏超出部分
        font-size: 13px;
        line-height: 1.2;
        padding: 6px 4px 0;
      }
      figure.earImg {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 12px;
        i {
          width: 12rem;
          height: 12rem;
          background-image: url(@/assets/imgs/svg/ear.svg);
        }
      }
    }
  }
}
</style>
