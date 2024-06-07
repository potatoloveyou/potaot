import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// todos: [
		// 	{
		// 		id: 1,
		// 		text: 1,
		// 		done: true,
		// 	},
		// 	{
		// 		id: 2,
		// 		text: 2,
		// 		done: false,
		// 	},
		// 	{
		// 		id: 4,
		// 		text: 4,
		// 		done: false,
		// 	},
		// ],

		// 初始化todos时可以直接赋值
		todos: JSON.parse(localStorage.getItem('todos')) || [],

		// 当前条件
		currentCondition: 'All',
	},

	getters: {
		// 当前显示任务
		currentTodo(state) {
			switch (state.currentCondition) {
				// 未完成任务
				case 'unfinished':
					return state.todos.filter((todo) => !todo.done);

				// 已完成任务
				case 'Completed':
					return state.todos.filter((todo) => todo.done);

				default:
					return state.todos;
			}
		},
	},

	mutations: {
		addTodo(state, text) {
			text &&
				(state.todos = [
					...state.todos,
					{
						id: state.todos.length ? Math.max(...state.todos.map((o) => o.id)) + 1 : 1,
						text,
						done: false,
					},
				]);
		},

		deleteTodo(state, id) {
			state.todos = state.todos.filter((todo) => todo.id !== id);
		},

		// 修改todo任务状态
		modifyState(state, { id, done }) {
			state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, done } : todo));
		},

		// 修改footer当前条件
		modifyCurrentCondition(state, currentCondition) {
			state.currentCondition = currentCondition;
		},

		// header全选完成/取消所有todo
		modifyAllDone(state, done) {
			state.todos = state.todos.map((todo) => ({ ...todo, done }));
		},

		// 修改todo内容
		modifyTodoContent(state, { id, text }) {
			state;
			console.log(id, text);
			state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, text } : todo));
		},

		// 清除已完成todo
		deleteCompletedTodo(state) {
			state.todos = state.todos.filter((todo) => !todo.done);
		},

		// 更新localStorage
		updateLocalStorage(state) {
			localStorage.setItem('todos', JSON.stringify(state.todos));
		},
	},
	actions: {},
	modules: {},
});
