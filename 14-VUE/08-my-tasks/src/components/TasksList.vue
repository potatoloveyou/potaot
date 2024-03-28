<template>
  <ul>
    <!-- 将TasksList自己循环出来的task状态绑定给TasksItem -->
    <!-- 这里的$event在自定义事件上，指定$emit携带的参数 -->
    <TasksItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @modify-state-TasksList-TasksItem="$emit('modify-state-App-TasksList', $event)"
      @delete-task="$emit('delete-task', $event)"
      @change-task-name-TasksList-TasksItem="$emit('change-task-nam-App-TasksList', $event)" />
  </ul>
</template>

<script>
// @符号固定代表src目录
import TasksItem from '@/components/TasksItem.vue';

export default {
  components: { TasksItem },
  props: {
    tasks: Array, // 定义props，类型为数组，用于接收父组件传递的任务列表数据。
  },
};
</script>

<style lang="less" scoped></style>
