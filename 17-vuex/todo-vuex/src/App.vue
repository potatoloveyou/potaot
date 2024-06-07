<template>
	<div id="app">
		<!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
		<TodoHeader></TodoHeader>
		<TodoList></TodoList>
		<TodoFooter></TodoFooter>
	</div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import { mapMutations } from 'vuex';

export default {
	name: 'App',
	components: {
		TodoHeader,
		TodoList,
		TodoFooter,
	},

	computed: {
		todos() {
			return this.$store.state.todos;
		},
	},

	methods: {
		...mapMutations(['updateLocalStorage']),
	},

	watch: {
		todos(newTodos) {
			this.updateLocalStorage(newTodos);
		},
	},
};
</script>

<style lang="less" scoped></style>
