<template>
  <div class="searchSongItem">
    <ul>
      <li class="songItem" v-for="selectedResult in selectedResults" :key="selectedResult.id">
        <a>
          <div class="introduce">
            <div class="song-name">{{ selectedResult.name }}</div>
            <div class="song-artist">
              <div class="toneQualityImg materialImg"></div>
              {{ selectedResult.artists[0].name }}-{{ selectedResult.album.name }}
            </div>
          </div>
          <div class="play-icon materialImg"></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchSongItem',
  props: {
    selectedResults: Array,
  },
};
</script>

<style lang="less" scoped>
</style>
