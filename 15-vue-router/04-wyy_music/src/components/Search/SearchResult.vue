<template>
  <!-- <div class="searchResult" v-if="keywords.length"> -->
  <div class="searchResult">
    <ul>
      <li class="value" v-show="keywords.length">搜索"{{ value }}"</li>
      <li v-for="(keyword, index) in keywords" :key="index" @click="$emit('select-result', keyword.keyword)">
        <div class="searchImg">
          <img src="@/assets/searchImg.svg" alt="" />
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
