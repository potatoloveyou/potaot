<template>
  <div class="studentModule">
    <h1>studentModule</h1>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>性别：{{ gender }}</p>
    <button @click="giveStudentName">把学生名字给SchoolModule组件</button>
  </div>
</template>

<script>
export default {
  name: 'StudentModule',
  data() {
    return {
      name: '张三',
      age: 18,
      gender: '男',
    };
  },
  methods: {
    giveStudentName(){
      this.$bus.$emit('giveStudentName', this.name);
    }
  },
};
</script>

<style lang="less" scoped></style>
