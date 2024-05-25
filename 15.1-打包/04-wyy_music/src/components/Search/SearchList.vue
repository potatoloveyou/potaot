<template>
  <div class="searchList">
    <div class="search-hot-list">
      <h3>热门搜索</h3>
      <ul>
        <li
          class="search-hotList-item"
          v-for="(searchHot, index) in searchHots"
          :key="index"
          @click="$emit('search-hotresult', searchHot.first)">
          {{ searchHot.first }}
        </li>
      </ul>
    </div>
    <div class="search-history-list">
      <ul>
        <li class="search-history-item" v-for="(history, index) in historys" :key="index">
          <figure class="figure-svg historyItem">
            <i class="i-svg"></i>
          </figure>
          <div>
            <span @click="$emit('search-history', history)">{{ history }}</span>
            <figure class="figure-svg deleteItem" @click="$emit('delete-history', history)">
              <i class="i-svg"></i>
            </figure>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    searchHots: Array,
    historys: Array,
  },
};
</script>

<style lang="less" scoped>
.searchList {
  .search-hot-list {
    padding: 15px 10px 0;
    h3 {
      font-size: 12px;
      line-height: 12px;
      color: #666;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0 7px;
      li.search-hotList-item {
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
  .search-history-list {
    ul {
      li.search-history-item {
        display: flex;
        align-items: center;
        figure.historyItem {
          i {
            width: 15px;
            height: 15px;
            margin: 0 10px;
            background-image: url(@/assets/imgs/svg/history.svg);
          }
        }
        div {
          flex: 1;
          display: flex;
          align-items: center;
          span {
            flex: 1;
          }
          figure.deleteItem {
            width: 32px;
            height: 32px;
            margin-right: 5px;
            i {
              width: 12px;
              height: 12px;
              background-image: url(@/assets/imgs/svg/historyDelete.svg);
            }
          }
        }
      }
    }
  }
}
</style>
