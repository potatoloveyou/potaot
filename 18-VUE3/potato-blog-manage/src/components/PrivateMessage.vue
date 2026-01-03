<template>
	<!-- 私信抽屉 -->
	<el-drawer v-model="drawer" header-class="pm-header" body-class="pm-body">
		<template #header class="mb-8">
			<span class="text-xl">私信 {{ privateMessageData.total }}</span>
		</template>
		<DynamicScroller
			:items="privateMessageData.list"
			key-field="id"
			:min-item-size="100"
			:buffer="300"
			@scroll-end="loadMore">
			<template #default="{ item }">
				<DynamicScrollerItem :item active>
					<Reply :data="item" :lineClamp="3" :isShow="false" @deleteReply="deleteReply"
				/></DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { comment } from '@/mock/mock';
import type { CommentType, CommentItemType } from '@/type/comment.type';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import Reply from '@/components/Overview/Comment/Reply.vue';

// interface PrivateMessageProps {
// 	data: CommentItemType[];
// }
// const { data = [] } = defineProps<PrivateMessageProps>();

const drawer = defineModel<boolean>('drawer');

// 删除评论
const deleteReply = async (id: number | string) => {
	console.log('我是Comment', id);
	// getComment();
};

// 分页大小
const limit = ref(20);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);
const loading = ref(false);
const finished = ref(false);

// 查询参数
const queryParams = computed(() => ({
	limit: limit.value,
	offset: offset.value,
}));

const privateMessageData = ref<CommentType<CommentItemType>>({
	total: 0,
	list: [],
});
// 获取私信
const getPrivateMessageData = async () => {
	const res = await comment.data;

	const newList = res.list.slice(offset.value, limit.value + offset.value);
	if (newList.length === 0) {
		finished.value = true;
		return;
	}

	privateMessageData.value = {
		total: res.total,
		list: [...privateMessageData.value.list, ...newList],
	};

	if (res.list.length < limit.value) {
		finished.value = true; // 没有更多了
	}
};

// 到底触发
const loadMore = async () => {
	console.log('到底了');
	if (loading.value || finished.value) return;
	loading.value = true;
	page.value++;
	await getPrivateMessageData();

	// 给虚拟列表一点缓冲
	await nextTick();
	loading.value = false;
};

onMounted(() => {
	getPrivateMessageData();
});
</script>

<style lang="scss">
.pm-header {
	margin-bottom: 0;
	padding-bottom: 1rem;
	border-bottom: 1px solid #00000030;
}
.pm-body {
	padding: 0 0.5rem 0 1rem;
	flex: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
	.vue-recycle-scroller {
		padding-right: 0.5rem;
		&::-webkit-scrollbar {
			width: 0.5rem; /* 滚动条厚度 */
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.4); /* 滑块颜色 */
			border-radius: 0.2rem;
		}

		&::-webkit-scrollbar-thumb:hover {
			background-color: rgba(0, 0, 0, 0.6);
		}

		&::-webkit-scrollbar-track {
			background-color: transparent; /* 滚动条轨道 */
		}
	}
}
</style>
