<template>
  <li>
    <!-- 此处的$event因为在原生事件里，指向DOM事件对象 -->
    <!-- 通过$event.target能访问到绑定在DOM对象身上的checked-->
    <input
      type="checkbox"
      :checked="task.done"
      @change="$emit('modify-state-TasksList-TasksItem', { id: task.id, done: $event.target.checked })" />
    <input type="text" v-if="editing" v-model="value" @keyup.esc="editing = false" @keyup.enter="changeTaskName" />
    <span class="task-name" v-else @dblclick="dblclick">
      {{ task.taskText }}
    </span>
    <button class="delete-task" @click="$emit('delete-task', task.id)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      editing: false,
      value: this.task.taskText,
    };
  },
  methods: {
    dblclick() {
      this.editing = true;
      this.value = this.task.taskText;
    },
    changeTaskName() {
      this.$emit('change-task-name-TasksList-TasksItem', { id: this.task.id, taskText: this.value });
      this.editing = false;
    },
  },
};
</script>

<style lang="less" scoped></style>
