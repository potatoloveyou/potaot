<template>
  <li class="recommendation-list-card">
    <img :src="`${personalized.picUrl}?imageView=1&type=webp&thumbnail=370x0`" alt="song.name" />
    <h5>{{ personalized.name }}</h5>
    <div class="earImg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
        <path
          fill-rule="evenodd"
          fill="#040000"
          d="M22 16.777c0 1.233-1.121 2.233-2.506 2.233-1.384 0-2.506-1-2.506-2.233v-2.553c0-1.234 1.122-2.233 2.506-2.233.174 0 .343.017.506.046v-1.37h-.033c.017-.22.033-.441.033-.666a8 8 0 0 0-16 0c0 .225.016.446.034.666H4v1.37c.163-.029.333-.046.505-.046 1.384 0 2.506.999 2.506 2.233v2.553c0 1.233-1.122 2.233-2.506 2.233S2 18.011 2 16.777v-2.553c0-.258.059-.501.148-.73A.982.982 0 0 1 2 13.001v-2.667c0-.023.012-.043.013-.067-.004-.088-.013-.176-.013-.266 0-5.523 4.477-10 10-10s10 4.477 10 10c0 .09-.009.178-.014.266.002.024.014.044.014.067v2a.988.988 0 0 1-.36.753c.224.334.36.72.36 1.138v2.552"
          opacity=".15" />
        <path
          fill-rule="evenodd"
          fill="#fff"
          d="M20 16.777c0 1.233-1.121 2.233-2.506 2.233-1.384 0-2.506-1-2.506-2.233v-2.553c0-1.234 1.122-2.233 2.506-2.233.174 0 .343.017.506.046v-1.37h-.033c.017-.22.033-.441.033-.666a8 8 0 0 0-16 0c0 .225.016.446.034.666H2v1.37c.163-.029.333-.046.505-.046 1.384 0 2.506.999 2.506 2.233v2.553c0 1.233-1.122 2.233-2.506 2.233S0 18.011 0 16.777v-2.553c0-.258.059-.501.148-.73A.982.982 0 0 1 0 13.001v-2.667c0-.023.012-.043.013-.067-.004-.088-.013-.176-.013-.266 0-5.523 4.477-10 10-10s10 4.477 10 10c0 .09-.009.178-.014.266.002.024.014.044.014.067v2a.988.988 0 0 1-.36.753c.224.334.36.72.36 1.138v2.552" />
      </svg>
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
      // if (this.playCount.length > 4) {
      //   return `${this.playCount.slice(0, this.playCount.length - 4)}.${this.playCount.slice(
      //     3,
      //     this.playCount.length - 4,
      //   )}万`;
      // } else if (this.playCount.length > 7) {
      //   return `${this.playCount.slice(0, this.playCount.length - 7)}.${this.playCount.slice(
      //     6,
      //     this.playCount.length - 7,
      //   )}亿`;
      // } else {
      //   return this.playCount;
      // }
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
.recommendation-list-card {
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
