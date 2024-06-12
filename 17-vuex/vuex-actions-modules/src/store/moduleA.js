export const moduleA = {
	// 作用是使其组件内的所有action、mutation、getter都带上命名空间，避免不同模块之间的命名冲突。
	// 人话就是现在这个组件内的所有东西都只是他自己的了，如果想调用这个组件的东西，需要加上命名空间。
	namespaced: true,

	state() {
		return {
			count: 10,
		};
	},

	getters: {},

	mutations: {
		addCount(state, { n }) {
			state.count += n;
		},
	},

	actions: {
		addCountAsync({ commit }, { n }) {
			setTimeout(() => {
				commit('addCount', { n });
			}, 1000);
		},
	},
};
