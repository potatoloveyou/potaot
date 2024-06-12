<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h1>{{ count }}</h1>
		<button @click="addCount({ n: 3 })">addCount: +3</button>
		<!-- <button @click="addCount4({ n: 4 })">addCount4: +4</button> -->
		<!-- <button @click="addCountActions5({ n: 5 })">addCountActions5: +5 用自己的方法dispatch分发</button> -->
		<button @click="addCountAsync({ n: 5 })">addCountAsync: +5 使用mapActions</button>
		<!-- <button @click="get">获取数据</button> -->
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import { wellReceivedList } from '@/apis/api';

export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	computed: {
		// ...mapState(['count']),

		// 访问module的state
		// 1.在前面加上模块名
		// ...mapState('moduleA', ['count']),
		// 2.使用对象展开运算符
		...mapState({
			count: (state) => state.moduleA.count,
			heatShowList: (state) => state.moduleB.heatShowList,
		}),
	},
	created() {
		// this.getWellReceivedList();
		// wellReceivedList().then((res) => {
		// 	console.log(res.data.movieList);
		// });
		this.getWellReceivedList();
	},
	methods: {
		// ...mapMutations(['addCount']),
		// ...mapActions(['addCountAsync', 'getWellReceivedList']),
		// 组件自己的方法commit提交
		// addCount4({ n }) {
		// 	this.$store.commit('addCount', { n });
		// },
		// 组件自己的方法dispatch分发
		// addCountActions5({ n }) {
		// 	this.$store.dispatch('addCountAsync', { n });
		// },
		// `````````````````````````````分开模块后`````````````````````````
		...mapMutations('moduleA', ['addCount']),
		...mapActions('moduleA', ['addCountAsync']),
		...mapActions('moduleB', ['getWellReceivedList']),
	},
};
</script>

<style scoped lang="scss"></style>
