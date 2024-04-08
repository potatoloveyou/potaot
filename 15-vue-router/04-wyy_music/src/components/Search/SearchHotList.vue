<template>
  <div class="searchHotlist">
    <ul class="searchHotList-item">
      <li v-for="(searchHot, index) in searchHots" :key="index">{{ searchHot.first }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'searchHotlist',
  props: {
    searchHots: Array, // 父组件传递的搜索热词列表数组，用于渲染搜索热词列表。
  },
};
</script>

<style lang="less" scoped>
.searchHotlist {
  padding: 15px 10px 0;
  .searchHotList-item {
    display: flex;
    flex-wrap: wrap;
    li {
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #c9c9c9;
      border-radius: 30rem;
    }
  }
}
</style>
