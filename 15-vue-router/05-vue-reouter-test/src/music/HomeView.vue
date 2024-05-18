<template>
  <div>
    <h3>HomeView</h3>
    <nav>
      <router-link to="/">RecomView</router-link>
      |
      <router-link to="/hot">HotView</router-link>
      |
      <router-link to="/search">SearchView</router-link>
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
