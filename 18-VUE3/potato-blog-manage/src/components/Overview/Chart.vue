<template>
	<div class="grid grid-rows-[auto_auto] gap-y-4">
		<div class="bg-white rounded-lg h-80 !p-4">
			<div class="flex justify-between items-center">
				<span class="!text-[1.2rem]">访问量</span>
				<el-radio-group v-model="visits" size="default" fill="#2B5AED">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
		</div>
		<div class="bg-white rounded-lg h-150">
			<div class="flex justify-between items-center">
				<span class="!text-[1.2rem]">数据监控</span>
				<el-radio-group v-model="monitor" size="default" fill="#2B5AED">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visits = ref('week');
const monitor = ref('week');
</script>

<style lang="scss" scoped></style>
