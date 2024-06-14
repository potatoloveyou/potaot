<template>
	<div class="home-view">
		<van-tabs v-model="activeName" @click="onClickTab">
			<!-- <van-tabs v-model="activeName"> -->
			<van-tab v-for="label in labels" :key="label.name" :title="label.text" :name="label.text"></van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	components: {},
	data() {
		return {
			// 通过名称匹配首页默认打开标签
			activeName: '男频',
			labels: [
				{ name: 'ManChannel', text: '男频' },
				{ name: 'WomanChannel', text: '女频' },
				{ name: 'Publish', text: '出版' },
				{ name: 'Classification', text: '分类' },
				{ name: 'Free', text: '免费' },
				{ name: 'Ranking', text: '排行' },
			],
		};
	},
	methods: {
		onClickTab({ labelName }) {
			let text = 'ManChannel';
			switch (labelName) {
				case '男频':
					text = 'ManChannel';
					break;
				case '女频':
					text = 'WomanChannel';
					break;
			}
			this.$router.push({ path: `${text}` });
		},
	},
};
</script>
