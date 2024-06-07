<template>
	<li class="todo-item">
		<input type="checkbox" :checked="todo.done" @change="modifyState({ id: todo.id, done: !todo.done })" />
		<input
			type="text"
			class="task-name"
			:value="todo.text"
			@keyup.enter="modifyTodoContent({ id: todo.id, text: $event.target.value })" />
		<button class="delete-task" @click="deleteTodo(todo.id)">X</button>
	</li>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	name: 'TodoItem',
	props: {
		todo: Object,
	},
	methods: {
		...mapMutations(['deleteTodo', 'modifyState', 'modifyTodoContent']),
	},
};
</script>

<style lang="less" scoped>
li {
	display: flex;
	input {
		// 鼠标变小手
		cursor: pointer;
		border: none;
		// 聚焦时去掉边框
		outline: none;
	}
}
</style>
