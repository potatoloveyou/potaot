<template>
	<!-- <div>{{ name }}</div> -->
	<!-- <button @click="test">测试1</button> -->
	<!-- <h1>你好</h1> -->
	<!-- <p>222</p> -->

	<!-- <el-button type="primary">测试</el-button> -->

	<!-- nuxt路由 -->
	<header>
		头部
		<ul>
			<li>
				<NuxtLink to="/">index页面</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/login">login页面</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/about">about页面</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/user/userEdit">userEdit页面</NuxtLink>
			</li>
		</ul>
	</header>
	<main>
		<NuxtPage />
	</main>
	<footer>尾部</footer>
</template>

<script setup>
	// const name = ref('aaa');

	// const config = useRuntimeConfig();
	// console.log(config.public.baseUrl);
	// console.log(config.count);

	// const test = () => {
	// 	console.log('test');
	// };

	// if (import.meta.server) {
	// 	console.log('服务端');
	// } else {
	// 	console.log('客户端');
	// }

	// export导出的函数
	// console.log(add(1, 2));
	// export default导出的函数（调用文件名）
	// console.log(myCom(1, 2));
</script>

<style lang="scss" scoped>
	p {
		color: $myP;
	}
	header,
	main,
	footer {
		border: 1px solid red;
	}
</style>
