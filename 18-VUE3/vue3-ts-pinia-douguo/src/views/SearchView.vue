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
					@search="onSearch">
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
import { ref, watch } from 'vue';
// import SearchHomepage from '@/views/Search/SearchHomepage.vue';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();
import { useRouter } from 'vue-router';
const router = useRouter();

import { debounce } from 'lodash';
// console.log(debounce);

/**
 * search	搜索框逻辑
 */

// 确定搜索时触发
const onSearch = (searchValue) => {
	// searchStore.searchValue = searchValue;
	searchStore.addNewHistory(searchValue);
};

// 输入框 输入时 内容变化时 触发
const updateValue = debounce((searchValue) => {
	searchStore.suggestList = [];
	if (searchValue) {
		searchStore.searchSuggest(searchValue);
	}
}, 300);

// 点击取消按钮时触发
// 返回上一级
// const onCancel = () => history.back();
const onCancel = () => {
	if (searchStore.searchValue != '') {
		searchStore.searchValue = '';
	} else {
		history.back();
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
