<template>
  <li class="songItem">
    <a>
      <!-- introduce介绍(左边歌手信息) -->
      <div class="introduce">
        <div class="song-name">{{ newsong.name }}</div>
        <div class="song-artist">
          <div class="toneQualityImg materialImg"></div>
          {{ newsong.song.artists[0].name }}-{{ newsong.song.album.name }}
        </div>
      </div>
      <div class="play-icon materialImg"></div>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    newsong: Object,
  },
};
</script>

<style lang="less">
.materialImg {
  background-image: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=');
  background-repeat: no-repeat;
  background-size: 166px 97px;
}

.songItem {
  border-bottom: 1rem solid rgb(208, 208, 208);
  padding: 5rem 10rem;
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .introduce {
      .song-artist {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #888;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .toneQualityImg {
          width: 12rem;
          height: 8rem;
          margin-right: 5rem;
        }
      }
    }
    .play-icon {
      width: 22px;
      height: 22px;
      background-position: -24px 0;
    }
  }
}
</style>
