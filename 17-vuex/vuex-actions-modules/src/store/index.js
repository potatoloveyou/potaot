import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { moduleA } from '@/store/moduleA';
import { moduleB } from '@/store/moduleB';

export default new Vuex.Store({
	state: {
		// count: 10,
		// heatShowList: [],
	},
	getters: {},
	mutations: {
		// addCount(state, { n }) {
		// 	state.count += n;
		// },
		// // set修改state中的wellReceivedList属性
		// setWellReceivedList(state, { list }) {
		// 	state.heatShowList = list;
		// },
	},
	actions: {
		// addCountAsync({ commit }, { n }) {
		// 	setTimeout(() => {
		// 		commit('addCount', { n });
		// 	}, 3000);
		// },
		// // 自己的异步方法名
		// getWellReceivedList({ commit }) {
		// 	// 调用接口方法名
		// 	wellReceivedList().then((res) => {
		// 		// 调用mutation方法名
		// 		commit('setWellReceivedList', { list: res.data.movieList });
		// 		// console.log(commit, res);
		// 	});
		// },
	},
	modules: {
		moduleA,
		moduleB, 
	},
});
