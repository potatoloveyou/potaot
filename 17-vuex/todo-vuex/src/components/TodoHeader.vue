<template>
	<div class="todo-header">
		<input type="checkbox" @change="modifyAllDone($event.target.checked)" />
		<input type="text" v-model="newTodo" placeholder="请输入任务" @keyup.enter="addTodo(newTodo), (newTodo = '')" />
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	name: 'TodoHeader',
	data() {
		return {
			newTodo: '',
		};
	},
	methods: {
		...mapMutations(['addTodo', 'modifyAllDone']),
	},
};
</script>

<style lang="less" scoped></style>
