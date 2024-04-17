<template>
  <div class="playListViews">playListViews</div>
</template>

<script>
export default {
  name: 'PlayListViews',
  created() {
    console.log(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped></style>
