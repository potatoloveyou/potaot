<template>
  <div class="simpleSongPlay">
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${song?.id}.mp3`"
      class="audio"
      ref="audio"
      autoplay></audio>
    <div class="songImg" @click="jumpSongPlay">
      <img :src="song.picUrl" alt="" class="songTurntable" />
    </div>
    <div class="songAuthor">{{ song.name }}-{{ song.song.artists[0].name }}</div>
    <div class="switchButton" @click="switchPlay">
      <i class="far fa-pause-circle" v-show="!isPlaying"></i>
      <i class="far fa-play-circle" v-show="isPlaying"></i>
    </div>
    <i class="fas fa-list-ul"></i>
  </div>
</template>

<script>
export default {
  name: 'SimpleSongPlay',
  data() {
    return {};
  },
  props: {
    // 歌曲信息对象，包含歌曲名称、歌手、专辑封面等信息
    song: Object,
    // 是否正在播放，根据需要传递该属性，用于控制播放状态的切换
    isPlaying: Boolean,
  },
  methods: {
    switchPlay() {
      // this.isPlaying = !this.isPlaying; // 切换播放状态，根据实际情况实现播放逻辑
      this.$emit('switch-Play');
      this.isPlaying ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    jumpSongPlay() {
      this.$router.push({ path: '/SongPlayViews'});
    },
  },
  mounted() {}, // 组件挂载后，可以在这里初始化音频播放器等操作
  computed: {}, // 计算属性，可以根据需要添加
};
</script>

<style lang="less" scoped>
.simpleSongPlay {
  width: 100%;
  height: 60rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 16rem;
  .audio {
  }
  .songImg {
    img {
      width: 40rem;
      height: 40rem;
      border: 5rem solid #000;
      border-radius: 50%;
    }
  }
  .songAuthor {
    flex: 1;
    margin-left: 10rem;
    font-size: 14rem;
  }
  .switchButton {
    margin-right: 15rem;
    opacity: 0.8;
    i {
      font-size: 24rem;
    }
  }
  .fas {
    font-size: 24rem;
  }
}
</style>
