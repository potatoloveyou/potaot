<template>
	<!-- 搜索 -->
	<div class="search">
		<div class="search-top">
			<form action="#" @submit.stop.prevent>
				<van-search
					v-model="searchStore.searchValue"
					show-action
					placeholder="请输入搜索关键词"
					@update:model-value="updateValue"
					@search="onSearch"
					@focus="focus">
					<template #action>
						<div class="cancel" @click="onCancel">取消</div>
					</template>
				</van-search>
			</form>
		</div>

		<RouterView />
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// import SearchHomepage from '@/views/Search/SearchHomepage.vue';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { debounce } from 'lodash';

// 点击取消按钮时触发
// 返回上一级
// const onCancel = () => history.back();
const onCancel = () => {
	if (searchStore.searchValue != '') {
		searchStore.searchValue = '';
		history.back();
	} else if (route.path == '/search') {
		router.push('/');
	}
};

/**
 * search	搜索框逻辑
 */

//  搜索标志位
const searchTriggered = ref(false);

// 确定搜索时触发
const onSearch = (searchValue) => {
	// searchStore.searchValue = searchValue;
	searchTriggered.value = true; // 标记已经触发了搜索
	searchStore.addNewHistory(searchValue);
	router.push('/search/searchNav');
};

// 输入框 输入时 内容变化时 触发
const updateValue = debounce((searchValue) => {
	if (searchTriggered.value) {
		searchTriggered.value = false; // 重置标志位
		return; // 如果已经触发了搜索，不再发送AJAX请求
	}
	searchStore.suggestList = [];
	if (searchValue) {
		searchStore.searchSuggest(searchValue);
	}
}, 500);

// 输入框聚焦时触发,只要聚焦就判断是否是在搜索页面，如果不在则跳转到搜索页面
const focus = () => {
	const path = route.path.split('/')[2];
	if (path != 'search' && searchStore.searchValue != '') {
		router.push('/search');
		// 重新根据搜索框的值发送一次axios
		searchStore.searchSuggest(searchStore.searchValue);
		console.log('focus');
	}
};
</script>

<style lang="scss">
.search {
	// padding: 0 1rem;

	.search-top {
		padding: 0 0.8rem;
		.van-search__content {
			padding: 0.1rem 0.4rem;
			background-color: rgba(128, 128, 128, 0.1);
			border-radius: 1rem;
			.van-field__left-icon {
				padding-left: 0.5rem;
			}
		}
		.van-search__action {
			padding-left: 1rem;
			padding-right: 0;
			font-size: 1rem;
			// color: red;
		}
	}
}
</style>
