<template>
  <div class="my-order-list">
    <div class="head-box">
      <van-tabs v-model="active" @click-tab="onClickTab">
        <van-tab v-for="item in list" :key="item.type" :title="item.name"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Tab, Tabs } from "vant";

Vue.use(VueRouter);

const routes = [
  { path: "/待发货", component: { template: "<div>待发货页面</div>" } },
  { path: "/待收货", component: { template: "<div>待收货页面</div>" } },
  { path: "/已收货", component: { template: "<div>已收货页面</div>" } },
  { path: "/售后", component: { template: "<div>售后页面</div>" } }
];

const router = new VueRouter({
  routes
});

export default {
  data() {
    return {
      active: 0,
      list: [
        { name: "待发货", type: 0 },
        { name: "待收货", type: 1 },
        { name: "已收货", type: 2 },
        { name: "售后", type: 3 }
      ]
    };
  },
  methods: {
    onClickTab({ title }) {
      // 根据点击的标签标题来匹配对应的路由类型
      let type = 0;
      if (title === "待发货") {
        type = 0;
      } else if (title === "待收货") {
        type = 1;
      } else if (title === "已收货") {
        type = 2;
      } else if (title === "售后") {
        type = 3;
      }

      // 更新路由
      this.$router.push({ path: `/${title}` });
    }
  },
  components: {
    "van-tab": Tab,
    "van-tabs": Tabs
  },
  router
};
</script>

<style scoped>
/* 样式定义 */
</style>
