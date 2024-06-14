<template>
  <header>
    <input type="checkbox" :checked="isallDone" @change="$emit('modify-all-state', $event.target.checked)" />
    <!-- 3.2addTask -->
    <input type="text" v-model="newTask" @keyup.enter="addTask" />
  </header>
</template>

<script>
export default {
  props: {
    isallDone: Boolean,
  },

  data() {
    return {
      newTask: '',
    };
  },

  methods: {
    // 3.1
    addTask() {
      // 2.2this.$emit('add-task',)
      // 当this.newTask.trim()存在时
      this.newTask.trim() && this.$emit('add-task', this.newTask.trim());
      this.newTask = '';
    },
  },
};
</script>

<style lang="less" scoped></style>
