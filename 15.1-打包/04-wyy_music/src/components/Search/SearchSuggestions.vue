<template>
  <!-- <div class="searchResult" v-if="keywords.length"> -->
  <div class="searchResult">
    <ul>
      <li class="value" v-show="keywords.length">搜索"{{ value }}"</li>
      <li v-for="(keyword, index) in keywords" :key="index" @click="$emit('select-result', keyword.keyword)">
        <figure class="figure-svg searchImg">
          <i class="i-svg"></i>
        </figure>
        {{ keyword.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
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

      figure.searchImg {
        width: 30rem;
        height: 30rem;
        i {
          width: 15px;
          height: 15px;
          background-image: url(@/assets/imgs/svg/search.svg);
        }
      }
    }
  }
}
</style>
