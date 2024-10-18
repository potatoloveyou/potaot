<template>
	<div>{{ name }}</div>
	<button @click="test">测试1</button>
	<h1>你好</h1>
	<p>222</p>

	<el-button type="primary">测试</el-button>
</template>

<script setup>
	const name = ref('aaa');

	const config = useRuntimeConfig();
	// console.log(config.public.baseUrl);
	// console.log(config.count);

	const test = () => {
		console.log('test');
	};

	if(import.meta.server){
		console.log('服务端');
	}else{
		console.log('客户端');
	}
	
</script>

<style lang="scss" scoped>
	p {
		color: $myP;
	}
</style>
