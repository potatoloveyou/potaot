<template>
	<h1 class="text-red-300">You did it!</h1>
	<p>Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the documentation</p>
	<div class="text-red-200">测试测试测试</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { login } from '@/api/index';
import { queuedRequest } from '@/api/requestWithQueue';

const queueStatus = ref(queuedRequest.getQueueStatus());

const loginParams = {
	username: 'admin',
	password: '123456',
};

const loginResponse = async () => {
	// const res = await login(loginParams);
	// console.log(res);
	// 这10个请求会依次执行，最多同时5个
	const promises = Array.from({ length: 100 }, (_, i) => login(loginParams));

	try {
		const results = await Promise.all(promises);
		console.log('所有请求完成', results);
	} catch (error) {
		console.error('部分请求失败', error);
	}

	// 更新队列状态显示
	queueStatus.value = queuedRequest.getQueueStatus();
	console.log(queueStatus.value);
};

// // 定时更新队列状态
// setInterval(() => {
// 	queueStatus.value = queuedRequest.getQueueStatus();
// }, 100);

onMounted(() => {
	loginResponse();
});
</script>
<style scoped lang="scss"></style>
