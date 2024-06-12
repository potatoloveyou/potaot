import { wellReceivedList } from '@/apis/api';

export const moduleB = {
	namespaced: true,
  
	state() {
		return {
			heatShowList: [],
		};
	},

	mutations: {
		// set修改state中的wellReceivedList属性
		setWellReceivedList(state, { list }) {
			state.heatShowList = list;
		},
	},

	actions: {
		// 自己的异步方法名
		getWellReceivedList({ commit }) {
			// 调用接口方法名
			wellReceivedList().then((res) => {
				// 调用mutation方法名
				commit('setWellReceivedList', { list: res.data.movieList });
				// console.log(commit, res);
			});
		},
	},
};
