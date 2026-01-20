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
	index: string;
	icon: Component;
	text: string;
	path: string;
}

const menuItems: MenuItem[] = [
	{
		index: '1',
		icon: House,
		text: '总览',
		path: 'Overview',
	},
	{
		index: '2',
		icon: Folder,
		text: '本地文件',
		path: 'LocalFiles',
	},
	{
		index: '3',
		icon: Document,
		text: '博客文章',
		path: 'BlogPosts',
	},
	{
		index: '4',
		icon: Camera,
		text: '摄影图库',
		path: 'PhotoGallery',
	},
	{
		index: '5',
		icon: EditPen,
		text: '随手笔记',
		path: 'HandwrittenNotes',
	},
	{
		index: '6',
		icon: Menu,
		text: '资源分享',
		path: 'ResourceSharing',
	},
	{
		index: '7',
		icon: Setting,
		text: '系统设置',
		path: 'SystemSettings',
	},
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
