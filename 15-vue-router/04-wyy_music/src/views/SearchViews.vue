<template>
  <div class="SearchViews">
    <searchBox :value="value" @modify-value="modifyValue"></searchBox>

    <div class="searchHotResult">
      <ul class="searchHotResult-item">
        <li v-for="(searchHot, index) in searchHots" :key="index">{{ searchHot.first }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import searchBox from '@/components/searchBox.vue';
import axios from 'axios';
export default {
  name: 'SearchViews',

  components: { searchBox },

  data() {
    return {
      value: '',
      searchHots: [],
    };
  },
  methods: {
    modifyValue(value){
      this.value = value;
    },

  },
  created() {
    Promise.all([axios.get('https://apis.netstart.cn/music/search/hot')]).then(([searchHots]) => {
      this.searchHots = searchHots.data.result.hots;
    });
  },
  watch: {
    value(n){
      console.log(n);
    }
  },
};
</script>

<style lang="less" scoped>
.SearchViews {
  margin-top: 125rem;

}

</style>
