<template>
  <div class="searchBox">
    <form class="form" action="#" @submit.stop.prevent>
      <figure class="figure-svg searchImg">
        <i class="i-svg"></i>
      </figure>
      <input
        type="text"
        class="searchInput"
        placeholder="搜索歌曲、歌手、专辑"
        :value="value"
        @input="$emit('modify-value', $event.target.value)"
        @focus="$emit('input-focus')"
        @keydown.enter.prevent="$emit('search-enter', $event.target)" />
      <figure class="figure-svg searchDeleteImg" v-show="isInputPresent" @click="$emit('delete-input')">
        <i class="i-svg"></i>
      </figure>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
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
  padding: 15px 10px;
  box-shadow: 0 0 2rem 0px rgb(208, 208, 208);
  .form {
    width: 100%;
    height: 30rem;
    display: flex;
    background-color: #ebecec;
    border-radius: 50rem;
    figure.searchImg {
      width: 30rem;
      height: 30rem;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        display: block;
        width: 13rem;
        height: 13rem;
        background-image: url(@/assets/imgs/svg/search.svg);
        transform: translateX(20%);
      }
    }
    .searchInput {
      flex: 1;
      height: 30rem;
      border: 0;
      background-color: transparent;
      outline: none;
      padding: 0;
    }
    figure.searchDeleteImg {
      width: 30rem;
      height: 30rem;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        display: block;
        width: 14px;
        height: 14px;
        background-image: url(@/assets/imgs/svg/searchDelete.svg);
      }
    }
  }
}
</style>
