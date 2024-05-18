<template>
  <div>
    <nav>
      <router-link to="/home">HomeView</router-link>
      |
      <router-link to="/home/recom">RecomView</router-link>
      |
      <router-link to="/home/hot">HotView</router-link>
      |
      <router-link to="/home/search">SearchView</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style lang="scss" scoped></style>
