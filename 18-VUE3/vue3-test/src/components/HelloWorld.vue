<template>
	<div class="greetings">
		<h1>{{ msg }}</h1>
		<p>{{ count }}</p>
		<p>{{ doubleCount }}</p>
		<button @click="countIncrement" class="btn">countIncrement</button>
	</div>
</template>

<!-- 在script上添加setup意味着只能使用vue3的组合式写法 -->
<script setup>
import { ref, computed, watch, onMounted, onUpdated, onUnmounted } from 'vue';

// 这里就是接收父组件传递的值
const props = defineProps({
	msg: String,
});

const count = ref(100);
const doubleCount = computed(() => count.value * 2);
const countIncrement = () => count.value++;

watch(count, (newProps) => {
	console.log('count changed:', newProps);
});

// 生命周期，可以说不需要create和destroy，只有onMounted和onUnmounted
// 因为setup是函数，函数里面没有this
console.log('(create)创建	count.value', count.value);

// onMounted	挂载
onMounted(() => {
	console.log('(Mounted)挂载', document.querySelector('.btn'));
});
onUpdated(() => {
	console.log('(update)更新', document.querySelector('.btn'));
});
onUnmounted(() => {
	console.log('(destroy)销毁');
});
</script>

<style></style>
