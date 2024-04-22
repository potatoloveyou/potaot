<template>
  <ul class="newSongList">
    <li class="songItem" v-for="newsong in newsongs" :key="newsong.id" @click="$emit('play-Song', newsong)">
      <a>
        <!-- introduce介绍(左边歌手信息) -->
        <div class="introduce">
          <div class="song-name">{{ newsong.name }}</div>
          <div class="song-artist">
            <div class="toneQualityImg materialImg"></div>
            <span>{{ newsong.song.artists[0].name }}-{{ newsong.song.album.name }}</span>
          </div>
        </div>

        <div class="play-icon materialImg"></div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NewSongList',
  props: {
    newsongs: Array,
  },
};
</script>

<style lang="less">
.materialImg {
  background-image: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=');
  background-repeat: no-repeat;
  background-size: 166px 97px;
}
.play-icon {
  width: 22px;
  height: 22px;
  background-position: -24px 0;
}

.songItem {
  border-bottom: 1rem solid rgb(208, 208, 208);
  padding: 5rem 10rem;

  a {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .introduce {
      width: calc(100% - 22px);
      .song-name {
        text-overflow: ellipsis; /* 当文本内容超出其容器时，显示省略号（...） */
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏超出容器的内容 */
      }
      .song-artist {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #888;
        .toneQualityImg {
          width: 12rem;
          height: 8rem;
          margin-right: 5rem;
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
