<template>
  <li class="recommendationListCard">
    <img :src="`${personalized.picUrl}?imageView=1&type=webp&thumbnail=370x0`" alt="song.name" />
    <h5>{{ personalized.name }}</h5>
    <div class="earImg">
      <img src="@/assets/earImg.svg" alt="" />
      {{ numberFormat }}
    </div>
  </li>
</template>
<script>
export default {
  props: {
    personalized: Object,
  },

  data() {
    return {
      playCount: this.personalized.playCount.toString(),
    };
  },

  computed: {
    numberFormat() {
      return this.playCount.length > 4
        ? `${this.playCount.slice(0, this.playCount.length - 4)}.${this.playCount.slice(
            3,
            this.playCount.length - 4,
          )}万`
        : this.playCount.length > 7
        ? `${this.playCount.slice(0, this.playCount.length - 7)}.${this.playCount.slice(
            6,
            this.playCount.length - 7,
          )}亿`
        : this.playCount;
    },
  },
};
</script>

<style lang="less" scoped>
.recommendationListCard {
  display: grid;
  position: relative;
  margin-bottom: 16rem;
  h5 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    // white-space: nowrap; // 防止文字换行
    overflow: hidden; // 隐藏超出部分
  }
  div.earImg {
    position: absolute;
    right: 0;
    height: 12rem;
    display: flex;
    color: #fff;
    font-size: 12px;
  }
}
</style>
