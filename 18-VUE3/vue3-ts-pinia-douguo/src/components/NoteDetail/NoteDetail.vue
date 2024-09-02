<template>
	<div class="video">
		<video :src="noteData.video_url" :poster="noteData.video_cover" height="80%"></video>
	</div>
	<div class="note-detail">
		<!-- 标题信息 -->
		<div class="record">
			<span class="selection_text">{{ noteData.selection_text }}</span>
		</div>

		<!-- 标题 -->
		<h2 class="title">{{ noteData.title }}</h2>

		<!-- 作品介绍 -->
		<p class="recipeData">
			{{ noteData.contents[0].c }}
		</p>

		<!-- 发布时间和信息 -->
		<div class="tiem-record">
			<div class="time">
				{{ noteData.publishtime.slice(0, noteData.publishtime.indexOf(' ')) }}
			</div>
			<div class="record">
				<span>{{ noteData.favo_count_text }}收藏</span>
				<span>{{ noteData.like_count_text }}收藏</span>
			</div>
		</div>

		<!-- 笔记评论 -->
		<div class="noteComments">
			<div class="noteComments-top">
				<span class="noteComments-title">笔记评论</span>
				<div class="noteComments-prompt">说点什么，让TA也认识爱做饭的你</div>
			</div>

			<div class="noteComments-content">
				<ul class="noteComments-list">
					<li class="noteComments-item"></li>
				</ul>
			</div>
		</div>

		<!-- 相关笔记 -->
		<div class="correlation">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="list-card">
					<div class="item-card" v-for="item in noteRelated">
						<NoteDetailCard :noteDetail="item" />
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { getNoteRelated } from '@/apis/api';
import NoteDetailCard from '@/components/NoteDetail/NoteDetailCard.vue';

const props = defineProps({
	noteData: Object,
});

// vant列表组件加载更多
const loading = ref(false);
const finished = ref(false);
// 笔记相关笔记（笔记详情里的相关笔记）
const noteRelated = ref([]);

// 更新偏移量
let offset = ref(0);
// 是否无数据
const isData = ref(false);

const noteRelatedShow = () => {
	getNoteRelated({ noteId: props.noteData.id })
		.then((res) => {
			noteRelated.value = [...noteRelated.value, ...res.data.result.list];
			console.log(noteRelated.value);
			if (res.data.result.end == 1) {
				isData.value = true;
			}
			nextTick(() => {
				offset.value++;
			});
		})
		.catch(() => {
			nextTick(() => {
				finished.value = true;
			});
		})
		.finally(() => {
			nextTick(() => {
				loading.value = false;
			});
		});
};

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	if (!isData.value) {
		noteRelatedShow();
	}
};
</script>

<style lang="scss" scoped>
.video {
	width: 100%;
}

.note-detail {
	padding: 1rem;
}

.record {
	padding: 1rem 0;
	.selection_text {
		padding: 0.2rem;
		background-color: #ffc533;
	}
}
.title {
	font-size: 1.5rem;
	font-weight: bolder;
	margin: 1.5rem 0;
}
.recipeData {
	font-size: 1.1rem;
}
.tiem-record {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #999;
	.record span:last-child {
		padding-left: 1rem;
	}
}

.noteComments {
	margin-top: 2rem;
	.noteComments-top {
		.noteComments-title {
			font-size: 1.1rem;
			font-weight: bold;
		}

		.noteComments-prompt {
			margin: 1rem 0;
			padding: 0.5rem 0;
			text-align: center;
			background-color: #cccccc30;
			color: #ccc;
			border-radius: 1.5rem;
		}
	}
}

.correlation {
	// margin-top: 2rem;
	.list-card {
		background-color: #9e9e9e15;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 0.8rem;
		.item-card {
			display: flex;
			flex-direction: column;
			// 四角变圆滑
			border-radius: 0.8rem;
			background-color: #fff;
			margin: 0.5rem 0;
		}
	}
}
</style>
