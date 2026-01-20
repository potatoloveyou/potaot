<template>
	<el-menu :default-active="route.name as string" router class="h-full aside-theme">
		<el-menu-item v-for="item in menuItems" :key="item.text" :index="item.path" class="w-40 h-10 mb-3 aside-theme">
			<el-icon>
				<component :is="item.icon" />
			</el-icon>
			<span>{{ item.text }}</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { House, Folder, Document, Camera, EditPen, Menu, Setting } from '@element-plus/icons-vue';

import { useRoute } from 'vue-router';
const route = useRoute();

interface MenuItem {
	icon: Component;
	text: string;
	path: string;
}

const menuItems: MenuItem[] = [
	{
		icon: House,
		text: '总览',
		path: 'Overview',
	},
	{
		icon: Folder,
		text: '本地文件',
		path: 'LocalFiles',
	},
	{
		icon: Document,
		text: '博客文章',
		path: 'BlogPosts',
	},
	{
		icon: Camera,
		text: '摄影图库',
		path: 'PhotoGallery',
	},
	{
		icon: EditPen,
		text: '随手笔记',
		path: 'HandwrittenNotes',
	},
	// {
	// 	icon: Menu,
	// 	text: '资源分享',
	// 	path: 'ResourceSharing',
	// },
	// {
	// 	icon: Setting,
	// 	text: '系统设置',
	// 	path: 'SystemSettings',
	// },
];

onMounted(() => {});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.aside-theme {
	transition:
		color,
		background-color 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor');
		background-color: getVar('bgColor');
	}
}

.el-menu {
	border-right: 0;
	.el-menu-item.is-active {
		border-radius: 0.5rem;
		color: #fff;
		background-image: $gradient-1 !important;
	}
}
</style>
