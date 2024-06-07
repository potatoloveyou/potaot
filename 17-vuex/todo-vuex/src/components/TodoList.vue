<template>
	<div class="todo-list">
		<ul>
			<TodoItem v-for="todo in currentTodo" :key="todo.id" :todo="todo" />
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'TodoList',
	components: {
		TodoItem: () => import('./TodoItem.vue'),
	},
	// 计算属性
	computed: {
		...mapGetters(['currentTodo']),
	},
};
</script>

<style lang="less" scoped></style>
