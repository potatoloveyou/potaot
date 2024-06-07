<template>
	<footer class="todo-footer">
		<p></p>
		<ul>
			<li
				v-for="condition in conditions"
				:key="condition"
				@click="modifyCurrentCondition(condition)"
				:class="{ active: condition === currentCondition }">
				{{ condition }}
			</li>
		</ul>
		<button @click="deleteCompletedTodo">delete-Completed-Task</button>
	</footer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'TodoFooter',
	data() {
		return {
			// 筛选条件
			conditions: ['All', 'unfinished', 'Completed'],
		};
	},
	// 计算属性
	computed: {
		...mapState(['currentCondition']),
	},
	methods: {
		...mapMutations(['modifyCurrentCondition', 'deleteCompletedTodo']),
	},
};
</script>

<style lang="less" scoped>
.todo-footer {
	margin-top: 20px;
	display: flex;
	ul {
		display: flex;
		li {
			margin: 0 10px;
		}
	}
}
.active {
	color: red;
}
</style>
