<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="info">信息按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
};
</script>

<style scoped lang="scss"></style>
