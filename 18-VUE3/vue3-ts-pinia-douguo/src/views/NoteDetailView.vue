<template>
	<!-- 笔记详情 -->
	<!-- <div>笔记详情</div> -->
	<div class="navTop">
		<van-icon name="arrow-left" @click="onClickLeft" />
		<div class="user" v-if="noteData.author">
			<div class="author">
				<van-image round width="2rem" height="2rem" :src="noteData.author.p" />
				<div class="author-information">
					<div class="information-above">
						{{ noteData.author.n }}
						<div class="author-vip">Lv.{{ noteData.author.lvl }}</div>
					</div>
					<div class="information-below" v-if="noteData.straight_text">
						{{ noteData.straight_text }}
					</div>
				</div>
			</div>
			<div class="attention">关注</div>
		</div>
		<van-icon name="ellipsis" color="#000" />
	</div>

	<NoteDetail v-if="noteData.id" :noteData="noteData" />

	<div class="navBottom">
		<input type="text" placeholder="说点什么" class="write-comment" />

		<div class="read-comment">
			<van-icon name="chat-o" size="1.4rem" />
			{{ noteData.cc }}
		</div>

		<div class="like_count">
			<van-icon name="like-o" size="1.4rem" />
			{{ noteData.like_count_text }}
		</div>

		<div class="collect" @click="addFav({ note: noteData })" v-if="!isInFav({ type: 3, id: noteData.id })">
			<van-icon name="star-o" size="1.4rem" />
			收藏
		</div>

		<div class="collect" @click="removeFav({ id: noteData.id })" v-else>
			<van-icon name="star" size="1.4rem" color="#ffce2d" />
			已收藏
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();
import { useNoteDetailStore } from '@/stores/noteDetail';
const noteDetailStore = useNoteDetailStore();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import NoteDetail from '@/components/NoteDetail/NoteDetail.vue';

// 笔记资料
const noteData = ref({});
const noteDetail = () => {
	favoritesStore.noteDetail(route.query.noteId).then((res) => {
		noteData.value = res.data.result.note;
		console.log(noteData.value);
	});
};

onMounted(() => {
	noteDetail();
});

// 此处很有问题
watch(
	() => route.query.noteId,
	(newNoteId) => {
		noteDetailStore.redirectNoteDetail(newNoteId);
	},
);

// 返回上一级
const onClickLeft = () => history.back();

// 添加收藏
const addFav = ({ note }) => (favoritesStore.noteFav = [...new Set([...favoritesStore.noteFav, note])]);

// 移除收藏
const removeFav = ({ id }) => {
	favoritesStore.noteFav = favoritesStore.noteFav.filter((item) => item.id != id);
};

// 是否在收藏中
const isInFav = computed(() => favoritesStore.isInFav);
</script>

<style lang="scss" scoped>
.navTop {
	width: 100%;
	padding: 0.8rem 0;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	.van-icon {
		padding: 0.5rem 1rem;
		font-size: 1.5rem;
	}
	.user {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.author {
			display: flex;
			.author-information {
				padding-left: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.information-above {
					display: flex;
					align-items: center;
					.author-vip {
						margin-left: 0.4rem;
						color: #d0a01a;
					}
				}
				.information-below {
					font-size: 0.8rem;
					color: #999;
				}
			}
		}
		.attention {
			margin-left: 1rem;
			padding: 0.5rem 1.4rem;
			border-radius: 1rem;
			font-size: 0.8rem;
			font-weight: bold;
			background-color: #ffc533;
		}
	}
}

.navBottom {
	width: 100%;
	padding: 0.8rem 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: white;
	padding: 1rem;
	box-sizing: border-box;
	input.write-comment {
		width: 30%;
		background-color: #f2f1f1;
		padding: 0.8rem;
		border-radius: 2rem;
	}
	.read-comment,
	.like_count,
	.collect {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex: 1;
	}
	.like_count,
	.collect {
		flex: 2;
	}
}
</style>
