<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- 使用组件第三步   在模板中使用组件 -->
    <HelloWorld msg="Welcome to Your Vue.js App" :nums="[1, 2, 3, 4]" />
    <TestModule :msg="Math.random()"/>
  </div>
</template>

<script>
// 使用组件第一步   引入组件
import HelloWorld from './components/HelloWorld.vue';
import TestModule from './components/TestModule.vue';

export default {
  name: 'App',
  // 使用组件第二步   注册组件
  components: {
    HelloWorld,
    TestModule,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
