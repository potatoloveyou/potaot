<template>
	<div class="home">
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<!-- <HelloWorld :count="count" @updata:count="count = $event" /> -->

		<HelloWorld :count.sync="count" />
		<!-- <HelloWorld v-bind:count.sync="obj.n" /> -->

		<hr />

		<button @click="show = !show">toggle</button>
		<keep-alive :exclude="['TestB']">
			<TestA v-if="show" />
			<TestB v-else />
		</keep-alive>
		<!-- 使用了 keep-alive 之后 创建（除了第一次） 和销毁生命周期就不起作用了 -->
		<!-- activated deactivated -->
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import TestA from '@/components/TestA.vue';
import TestB from '@/components/TestB.vue';

export default {
	name: 'HomeView',
	components: {
		HelloWorld,
		TestA,
		TestB,
	},
	data: function () {
		return {
			count: 10,
			obj: {
				n: 10,
			},

			show: true,
		};
	},

	created() {
		// 先获取路由的参数 根据参数获取 ajax  playlist
		// 股票 根据股票代码获取股票价格 => 实时变动 ajax轮询 websocket
	},
	updated() {},

	destroyed() {
		// 股票 取消定时器 ajax轮询 websocket
	},
	watch: {
		// 监听路由的更行 获取到最新的参数 根据参数获取 ajax  playlist
	},
};
</script>
