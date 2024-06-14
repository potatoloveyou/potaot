<template>
	<div>
		<h1>TestA - {{ n }}</h1>
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			n: 10,
		};
	},
	created() {
		console.log('TestA created');
	},
	destroyed() {
		console.log('TestA destroyed');
	},
};
</script>

<style lang="less" scoped></style>
