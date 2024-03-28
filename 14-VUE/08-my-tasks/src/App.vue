<template>
  <div id="app">
    <!-- 2.add-task  1.2addTask -->
    <!-- 通过TasksList传递的add-task自定义事件触发  app自己的addTask-->
    <TasksHeader @add-task="addTask" :isallDone="isallDone" @modify-all-state="modifyAllState" />
    <!-- 将app的tasks状态绑定给TasksList -->
    <!-- 通过TasksList传递的modify-state-App-TasksList自定义事件触发  
      app自己的modifyState-->
    <TasksList
      :tasks="currentTasks"
      @modify-state-App-TasksList="modifyState"
      @delete-task="deleteTask"
      @change-task-nam-App-TasksList="changeTaskName" />
    <TasksFooter
      :conditions="conditions"
      :unfinishedQuantity="unfinishedTasks.length"
      @change-condition="currentCondition = $event"
      :currentCondition="currentCondition" @delete-Completed-Task="deleteCompletedTask"/>
  </div>

  <!-- 
    app
      TasksHeader
      TasksList
        TasksItem
      TasksFooter
  -->
</template>

<script>
import TasksHeader from './components/TasksHeader.vue';
import TasksList from './components/TasksList.vue';
// import TasksItem from './components/TasksItem.vue';
import TasksFooter from './components/TasksFooter.vue';

export default {
  name: 'App',

  components: {
    TasksHeader,
    TasksList,
    TasksFooter,
  },

  data() {
    return {
      // 当两个或以上的子组件需要共享同一个数据时，应需要把数据写在公共的父级传递下去
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],

      // 筛选条件
      conditions: ['All', 'unfinished', 'Completed'],
      // 当前显示条件
      currentCondition: 'All',
    };
  },

  computed: {
    // 所有任务是否已完成
    isallDone() {
      return this.tasks.every((task) => task.done);
    },
    // 未完成任务
    unfinishedTasks() {
      return this.tasks.filter((task) => !task.done);
    },
    // 已完成任务
    completedTask() {
      return this.tasks.filter((task) => task.done);
    },
    // 当前显示任务
    currentTasks() {
      switch (this.currentCondition) {
        case 'unfinished':
          return this.unfinishedTasks;

        case 'Completed':
          return this.completedTask;

        default:
          return this.tasks;
      }
    },
  },

  methods: {
    // 1.1
    // 添加任务
    addTask(taskText) {
      console.log(taskText);
      this.tasks.push({
        id: this.tasks.length ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1,
        // taskText: taskText,
        taskText, //简写
        done: false,
      });
    },

    // 修改状态
    modifyState({ id, done }) {
      console.log(id, done);
      console.log('modifyState');
      this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, done } : task));
    },

    // 全选完成/取消完成所有任务
    modifyAllState(done) {
      this.tasks = this.tasks.map((task) => ({ ...task, done }));
    },

    // 删除任务
    deleteTask(id) {
      console.log(id);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    // 修改任务名
    changeTaskName({ id, taskText }) {
      this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, taskText } : task));
    },

    // 删除已完成的任务
    deleteCompletedTask() {
      // 让当前的任务等于未完成的任务，即可实现清除已完成的任务
      this.tasks = this.unfinishedTasks;
    },
  },

  watch: {
    tasks(newTask) {
      console.log('监测到修改', newTask);
      // localStorage.setItem('tasks', JSON.stringify(newTasks));
      localStorage.setItem('tasks', JSON.stringify(newTask));
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
