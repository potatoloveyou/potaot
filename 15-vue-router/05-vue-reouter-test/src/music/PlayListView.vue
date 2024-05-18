<template>
  <div>PlaylistView</div>
</template>

<script>
export default {
  name: 'PlaylistView',

  data() {
    return {
      id: null,
    };
  },

  // beforeRouteEnter 和  created都可获得路由参数
  // 路由进入前
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter', to, this);
    // 获取不到this,因为beforeRouteEnter在created之前，created之后才创建组件

    // 可以使用回调函数来获取this，在回调函数中可以获取到this。
    next((vm) => {
      console.log('beforeRouteEnter next', vm.id, vm.$route.params.id);
      // 这里可以获取到this和id，因为next是在created之后执行的。

      // 更新id，当路由变化时，更新id。
      // vm.id = vm.$route.params.id;
      // vm.id = to.params.id;
    });
  },

  // 组件创建
  created() {
    console.log('PlaylistView 创建');
    this.id = this.$route.params.id;
    // 只会在组件创建时执行一次，当路由更新时不会执行，需要使用watch来监听路由变化。

    this.timer = setInterval(() => {
      console.log(`${this.id} now is ${Date.now()}`);
    }, 1000);
  },

  // beforeRouteUpdate  和  watch都可以监听路由变化
  // 路由更新前
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate', to);
    // // 更新id，当路由变化时，更新id。
    this.id = to.params.id;
    next();
  },

  // 若是不想在在watch中更改id，可以在beforeRouteUpdate路由更新前更改id。
  // watch: {
  //   $route(to) {
  //     // 这里可以获取到this和id，因为watch是在created之后执行的。
  //     console.log('$route', to, this.id);
  //     // 更新id，当路由变化时，更新id。
  //     this.id = to.params.id;
  //   },
  // },

  // 数据更新后
  updated() {},

  // beforeRouteLeave  和
  // 路由离开前
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    clearInterval(this.timer);

    next();
  },

  // // 组件销毁前
  // destroyed() {
  //   console.log('PlayListView 销毁');
  //   clearInterval(this.timer);
  // },
};
</script>

<style lang="scss" scoped></style>
