<template>
	<el-row justify="space-between" class="items-center">
		<el-col :span="12" class="cursor-pointer">
			<div class="flex items-center" @click="goOverview">
				<el-image src="src/assets/images/yike.png" class="w-9 h-9 rounded-full !mr-2" />
				<el-text size="large" class="!font-bold !text-xl header-theme">土豆博客后台</el-text>
			</div>
		</el-col>
		<el-col :span="12" class="!flex justify-end items-center">
			<el-button :icon="Message" text @click="openDrawer" class="!p-2 !mr-4 !text-2xl" />

			<el-avatar shape="circle" size="default" src="src/assets/images/xxmLogo.png" class="!mr-4" />
			<div class="cursor-pointer">
				<el-icon :size="20" @click="themeStore.switchTheme" v-if="themeStore.themes == 'light'" class="!mr-4">
					<Sunny />
				</el-icon>

				<el-icon :size="20" @click="themeStore.switchTheme" v-else class="!mr-4">
					<Moon />
				</el-icon>
			</div>
			<el-button type="primary" class="button">退出</el-button>
		</el-col>
	</el-row>
	<PrivateMessage
		v-model:drawer="drawer"
		:data="sliceData"
		v-if="privateMessageData.list.length"
		:privateMessageDataTotal="privateMessageData.total" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { comment } from '@/mock/mock';
import type { CommentResponseType, CommentItemType } from '@/type/index';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

import { Message, Sunny, Moon } from '@element-plus/icons-vue';

import PrivateMessage from '@/components/PrivateMessage.vue';

const goOverview = () => {
	router.push('/');
};

const drawer = ref(false);
const openDrawer = () => {
	drawer.value = true;
};

const privateMessageData = ref<CommentResponseType<CommentItemType>>({
	total: 0,
	list: [],
});
const sliceData = ref<CommentItemType[]>();
const limit = ref(20);
const offset = ref(0);
// 获取私信
const getPrivateMessage = async () => {
	let res = await comment.data;
	privateMessageData.value = res;
	sliceData.value = privateMessageData.value.list.slice(offset.value, limit.value + offset.value);
};

onMounted(() => {
	getPrivateMessage();
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.header-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor');
	}
}
</style>
