<template>
  <div class="searchBox">
    <form class="form" action="#" @submit.stop.prevent>
      <!-- <div class="form"> -->
      <div class="searchImg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
          <path
            fill-rule="evenodd"
            fill="#c9c9ca"
            d="M25.181 23.535l-1.414 1.414-7.315-7.314A9.966 9.966 0 0 1 10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10c0 2.342-.811 4.49-2.16 6.195l7.341 7.34zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
        </svg>
      </div>

      <input
        type="text"
        class="searchInput"
        placeholder="搜索歌曲、歌手、专辑"
        :value="value"
        @input="$emit('modify-value', $event.target.value)"
        @focus="$emit('input-focus')"
        @keyup.enter.stop.prevent="$emit('search-enter')" />
      <div class="searchDelete">
        <button v-show="isInputPresent" @click="$emit('delete-input')">X</button>
      </div>
      <!-- </div> -->
    </form>
    <!-- BUG:不能阻止form和input的默认事件，input回车时会刷新value值会消失 -->
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  props: {
    value: String,
  },

  computed: {
    isInputPresent() {
      return this.value ? true : false;
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.searchBox {
  // padding: 0 20rem 10rem 20rem;
  padding: 15px 10px;
  box-shadow: 0 0 2rem 0px rgb(208, 208, 208);
  .form {
    // .xxx {
    width: 100%;
    height: 30rem;
    display: flex;
    background-color: #ebecec;
    border-radius: 50rem;
    .searchImg {
      width: 30rem;
      height: 30rem;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        // font-size: 12rem;
        width: 60%;
        height: 70%;
        transform: translateX(10%);
      }
    }
    .searchInput {
      width: 100%;
      height: 30rem;
      border: 0;
      background-color: transparent;
      outline: none;
    }
    .searchDelete {
      width: 30rem;
      height: 30rem;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        padding: 0;
        border: 0;
        width: 16rem;
        height: 16rem;
        font-size: 10rem;
        font-weight: bolder;
        transform: translateX(-10%);
        background-color: rgba(169, 169, 169, 0.6);
        border-radius: 50%;
        color: #fff;
      }
    }
  }
}
</style>
