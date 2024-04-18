<template>
  <div class="searchViews">
    <img class="loading" src="@/assets/imgs/doubleRingLoading.gif" alt="" v-show="loading" />
    <SearchBox
      :value="value"
      @modify-value="modifyValue"
      @input-focus="inputFocus"
      @delete-input="deleteInput"
      @search-enter="selectResult(value, $event)"
      ref="myInput"></SearchBox>
    <SearchList
      :searchHots="searchHots"
      v-show="!keywords.length && !selectedResults.length"
      @search-hotresult="selectResult"
      :historys="historys"
      @search-history="selectResult($event)"
      @delete-history="deleteHistory"></SearchList>
    <SearchSuggestions
      :keywords="keywords"
      :value="value"
      @select-result="selectResult"
      v-show="!selectedResults.length"></SearchSuggestions>
    <SearchSongList
      :selectedResults="selectedResults"
      :value="value"
      v-show="selectedResults.length"
      :axiosGetSelectResult="axiosGetSelectResult"></SearchSongList>
  </div>
</template>

<script>
import SearchBox from '@/components/Search/SearchBox.vue';
import SearchList from '@/components/Search/SearchList.vue';
import SearchSuggestions from '@/components/Search/SearchSuggestions.vue';
import SearchSongList from '@/components/Search/SearchSongList.vue';

import { getSearchHotList, getSearchSuggestions, getSelectResult } from '@/apis/api';

// npm uninstall lodash     删除lodash
const debounce = require('lodash/debounce');

export default {
  name: 'SearchViews',

  components: {
    SearchBox,
    SearchList,
    SearchSuggestions,
    SearchSongList,
  },

  data() {
    return {
      // 输入框
      value: '',
      // 热搜结果
      searchHots: [],
      // 搜索结果列表
      keywords: [],
      // 是否确认搜索结果，用于处理点击搜索结果时的事件处理逻辑
      isConfirm: false,
      // 选中的搜索结果
      selectedResults: [],
      // 等待加载图标
      loading: false,
      // 搜索历史记录
      historys: JSON.parse(localStorage.getItem('searchHistory')) || [],
    };
  },

  methods: {
    // 修改输入框的值
    modifyValue(value) {
      this.isConfirm = false;
      this.value = value;
    },

    // 点击删除按钮时清除value
    deleteInput() {
      this.value = '';
      this.keywords = []; // 清空搜索结果列表
      this.selectedResults = [];
    },

    // 输入框获取焦点时触发，显示搜索结果列表
    async inputFocus() {
      // 重置确认状态，以便重新触发watch事件处理函数
      this.isConfirm = false;
      this.selectedResults = [];
      // 如果输入框有值，选择搜索没有结果，搜索建议列表为空，则请求搜索建议列表数据
      if (this.value && this.selectedResults.length === 0 && this.keywords.length === 0) {
        this.loading = true;
        await getSearchSuggestions(this.value).then((res) => {
          this.loading = false;
          this.keywords = res.data.result.allMatch;
        });
      }
    },

    async axiosGetSelectResult() {
      await getSelectResult(this.value, this.selectedResults.length).then((res) => {
        // 更新选中的搜索结果
        // this.selectedResults = [...this.selectedResults, ...res.data.result.songs];
        this.selectedResults = [...new Set([...this.selectedResults, ...res.data.result.songs].map((item) => item))];
      });
    },

    // 选择 或 回车 搜索结果
    // 只有input回车时才会传递event，其他情况不传递event
    async selectResult(keyword, event) {
      // 当event存在时(input回车)，取消input的聚焦事件
      event ? event.blur() : void 0;

      this.isConfirm = true;
      // 更新输入框的值，以便显示选中的结果
      this.value = keyword;
      this.loading = true;

      if (this.value && this.selectedResults.length === 0) {
        this.keywords = [];
        await this.axiosGetSelectResult();
        this.loading = false;
      }

      // 存储每次搜索的内容(新内容需要在上面，所以需要先添加keyword 在展开数组)
      this.historys = [...new Set([keyword, ...this.historys])];
    },

    // 删除历史记录
    deleteHistory(history) {
      console.log(history);
      this.historys = this.historys.filter((item) => item !== history);
    },
  },

  created() {
    this.loading = true;
    Promise.all([getSearchHotList()]).then(([searchHots]) => {
      this.loading = false;
      this.searchHots = searchHots.data.result.hots;
    });
  },

  watch: {
    value: debounce(function (newValue) {
      if (newValue && this.isConfirm === false) {
        this.loading = true;
        getSearchSuggestions(newValue).then((res) => {
          this.loading = false;
          if (this.value) {
            this.keywords = res.data.result.allMatch;
          }
        });
      } else if (newValue == '' && this.isConfirm === false) {
        this.loading = false;
        this.keywords = [];
        this.selectedResults = [];
      }
    }, 500),

    historys(newHistory) {
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    },
  },
};
</script>

<style lang="less" scoped>
.searchViews {
  position: absolute;
  top: 125rem;
  left: 0%;
  width: 100%;
  .loading {
    width: 100rem;
    height: 100rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
}
</style>
