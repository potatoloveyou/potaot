<template>
	<!-- 文章列表 -->
	<div>
		<WhiteContainer class="w-full h-40 mb-4" v-for="item in 20"> </WhiteContainer>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WhiteContainer from '@/components/WhiteContainer.vue';
</script>

<style lang="scss" scoped></style>
