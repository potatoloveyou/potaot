<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		123
		<van-rate v-model="value" />
		<van-button type="primary">主要按钮</van-button>
		<van-button type="info">信息按钮</van-button>
		<van-button type="default">默认按钮</van-button>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	data() {
		return {
			value: 3,
		};
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
