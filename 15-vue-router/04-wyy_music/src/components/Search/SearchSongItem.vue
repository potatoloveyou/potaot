<template>
  <div class="searchSongItem" ref="searchSongItem" @scroll="handleScroll">
    <ul>
      <li class="songItem" v-for="selectedResult in selectedResults" :key="selectedResult.id">
        <a>
          <div class="introduce">
            <div class="song-name">{{ selectedResult.name }}</div>
            <div class="song-artist">
              <div class="toneQualityImg materialImg"></div>
              <span>{{ selectedResult.artists[0].name }}-{{ selectedResult.album.name }}</span>
            </div>
          </div>
          <div class="play-icon materialImg"></div>
        </a>
      </li>
    </ul>
    <img class="bottomLoading" src="@/assets/bottomLoading.svg" alt="" v-show="isBottom" />
  </div>
</template>

<script>
export default {
  name: 'SearchSongItem',
  props: {
    value: String,
    selectedResults: Array,
    axiosGetSelectResult: Function,
  },
  data() {
    return {
      // 是否滚动到底部
      isBottom: false,

      // 用于存储searchSongItem的DOM元素
      searchSongItem: null,
    };
  },

  // 能拿到DOM
  mounted() {
    this.searchSongItem = this.$refs.searchSongItem;
  },

  methods: {
    async handleScroll() {
      if (
        !this.isBottom &&
        this.searchSongItem.scrollTop + this.searchSongItem.clientHeight + 50 >= this.searchSongItem.scrollHeight
      ) {
        this.isBottom = true;
        // console.log('到底了');
        await this.axiosGetSelectResult();
        this.isBottom = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.searchSongItem {
  width: 100%;
  // background-color: rgba(255, 0, 0, 0.3);
  height: calc(100vh - 130rem - 60rem);
  overflow: auto;
  position: absolute;
  top: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .bottomLoading {
    height: 50rem;
  }
}
</style>
