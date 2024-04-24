<template>
  <div class="schoolModule">
    <h1>SchoolModule</h1>
    <h2>{{ name }}</h2>
    <h2>{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: 'SchoolModule',
  data() {
    return {
      name: 'School',
      address: 'China',
    };
  },
  mounted() {
    console.log('SchoolModule', this.x);
    this.$bus.$on('giveStudentName', (data) => {
      console.log('SchoolModule', data);
    });
  },
  beforeDestroy() {
    this.$bus.$off('giveStudentName');
  },
};
</script>

<style lang="less" scoped></style>
