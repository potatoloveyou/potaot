<template>
  <!-- <div class="searchResult" v-if="keywords.length"> -->
  <div class="searchResult">
    <ul>
      <li class="value" v-show="keywords.length">
        搜索"{{ value }}"
      </li>
      <li v-for="(keyword, index) in keywords" :key="index" @click="$emit('select-result', keyword.keyword)">
        <div class="searchImg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
            <path
              fill-rule="evenodd"
              fill="#c9c9ca"
              d="M25.181 23.535l-1.414 1.414-7.315-7.314A9.966 9.966 0 0 1 10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10c0 2.342-.811 4.49-2.16 6.195l7.341 7.34zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
          </svg>
        </div>
        {{ keyword.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  props: {
    keywords: Array,
    value: String,
  },
};
</script>

<style lang="less" scoped>
.searchResult {
  ul {
    .value {
      color: #507daf;
      font-size: 16rem;
      padding-left: 10rem;
    }
    li {
      display: flex;
      align-items: center;
      line-height: 48rem;
      box-shadow: 0 0 2rem 0px rgba(208, 208, 208, 0.5);

      .searchImg {
        width: 30rem;
        height: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          // font-size: 12rem;
          width: 60%;
          height: 70%;
          transform: translateX(10%);
        }
      }
    }
  }
}
</style>
