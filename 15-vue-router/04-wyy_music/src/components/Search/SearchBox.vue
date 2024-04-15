<template>
  <div class="searchBox">
    <form class="form" action="#" @submit.stop.prevent>
      <div class="searchImg">
        <img src="@/assets/searchImg.svg" alt="" />
      </div>
      <input
        type="text"
        class="searchInput"
        placeholder="搜索歌曲、歌手、专辑"
        :value="value"
        @input="$emit('modify-value', $event.target.value)"
        @focus="$emit('input-focus')"
        @keydown.enter.prevent="$emit('search-enter', $event.target)" />
      <div class="searchDelete">
        <button v-show="isInputPresent" @click="$emit('delete-input')">X</button>
      </div>
    </form>
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
  padding: 15px 10px;
  box-shadow: 0 0 2rem 0px rgb(208, 208, 208);
  .form {
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
      img{
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
