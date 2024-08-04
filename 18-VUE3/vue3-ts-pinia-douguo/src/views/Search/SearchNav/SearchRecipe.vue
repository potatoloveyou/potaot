<template>
	<!-- 搜索菜谱 -->
	<div class="search-recipe-top">
		<div class="top-left">
			<ul>
				<li>综合</li>
				<li>收藏高</li>
				<li>收藏高</li>
			</ul>
		</div>
		<div class="top-right">
			视频
			<van-icon name="play-circle-o" />
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search-recipe-top {
	display: flex;
	justify-content: space-between;
	color: #646566;
	padding: 0.6rem 0.8rem;
	.top-left {
		ul {
			display: flex;
			li {
				// padding: 0.8rem 1rem 0.8rem 0;
				padding-right: 1rem;
			}
		}
	}
	.top-right {
	}
}
</style>
