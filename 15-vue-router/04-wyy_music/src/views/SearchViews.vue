<template>
  <div class="searchViews">
    <SearchBox
      :value="value"
      @modify-value="modifyValue"
      @input-focus="inputFocus"
      @delete-input="deleteInput"
      @search-enter="selectResult(value)"
      ref="myInput"></SearchBox>
    <SearchHotList :searchHots="searchHots" v-show="!keywords.length && selectedResults == null"></SearchHotList>
    <SearchResult
      :keywords="keywords"
      :value="value"
      @select-result="selectResult"
      v-show="!selectedResults"></SearchResult>
    <SearchSongItem :selectedResults="selectedResults"></SearchSongItem>
  </div>
</template>

<script>
import SearchBox from '@/components/Search/SearchBox.vue';
import SearchHotList from '@/components/Search/SearchHotList.vue';
import SearchResult from '@/components/Search/SearchResult.vue';
import SearchSongItem from '@/components/Search/SearchSongItem.vue';

import { getSearchHots, getSearchSuggestions, getSelectResult } from '@/apis/api.js';

// npm uninstall lodash     删除lodash
const debounce = require('lodash/debounce')

export default {
  name: 'SearchViews',

  components: {
    SearchBox,
    SearchHotList,
    SearchResult,
    SearchSongItem,
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
      selectedResults: null,
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
    },

    // 输入框获取焦点时触发，显示搜索结果列表
    async inputFocus() {
      // 重置确认状态，以便重新触发watch事件处理函数
      this.isConfirm = false;
      this.selectedResults = null;
      // 如果输入框有值，选择搜索没有结果，搜索建议列表为空，则请求搜索建议列表数据
      if (this.value && this.selectedResults === null && this.keywords.length === 0) {
        await getSearchSuggestions(this.value).then((res) => {
          this.keywords = res.data.result.allMatch;
        });
      }
    },

    // 选择搜索结果
    async selectResult(keyword) {
      // console.log(keyword);
      // 标记为确认搜索结果，以便在watch中处理搜索结果的显示逻辑
      this.isConfirm = true;
      // 更新输入框的值，以便显示选中的结果
      this.value = keyword;
      if (this.value && this.selectedResults === null) {
        this.keywords = [];
        await getSelectResult(keyword).then((res) => {
          console.log(res.data.result);
          this.selectedResults = res.data.result.songs; // 更新选中的搜索结果
        });
      }
    },
  },

  created() {
    Promise.all([getSearchHots()]).then(([searchHots]) => {
      this.searchHots = searchHots.data.result.hots;
    });
  },

  watch: {
    value: debounce(async function (newValue) {
      if (newValue && this.isConfirm === false) {
        await getSearchSuggestions(newValue).then((res) => {
          // console.log('newValues', res.data.result.allMatch);
          if (this.value) {
            this.keywords = res.data.result.allMatch;
          }
        });
      } else if (newValue == '' && this.isConfirm === false) {
        this.selectedResults = null;
        this.keywords = [];
      }
    }, 500),
  },
};
</script>

<style lang="less" scoped>
.searchViews {
  margin-top: 125rem;
}
</style>
