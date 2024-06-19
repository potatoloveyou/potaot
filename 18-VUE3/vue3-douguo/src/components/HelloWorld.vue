<template>
	<div class="greetings">
		<h1>我是HelloWorld</h1>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="success">成功按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
	</div>
</template>

<script setup>
import { getConfig, getInit } from '@/apis/api';
getConfig().then((res) => {
	console.log(res);
});
getInit().then((res) => {
	console.log(res);
});
</script>

<style scoped></style>
