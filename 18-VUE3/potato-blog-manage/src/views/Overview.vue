<template>
	<div class="over-view">
		<Topic @search="changeSearch" :isSearch="false" />
		<Gather />
	</div>
</template>

<script setup lang="ts">
import Topic from '@/components/Topic.vue';
import Gather from '@/components/Overview/Gather.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
</script>

<style lang="scss" scoped></style>
