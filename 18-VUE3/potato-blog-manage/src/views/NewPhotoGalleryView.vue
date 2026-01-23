<template>
	<!-- 新建摄影图库 -->
	<div class="w-[95%] flex flex-col">
		<WhiteContainer class="grid grid-cols-[1fr_auto] pb-0 mb-4">
			<Topic name="新建摄影图库" :isSearch="false">
				<template #custom>
					<div>
						<el-button type="info" plain>取消</el-button>
						<el-button type="primary" color="#2b5aed">发布</el-button>
					</div>
				</template>
			</Topic>
		</WhiteContainer>
		<div class="flex-1 grid grid-cols-[2fr_1fr] gap-x-4">
			<DragUpload />
			<NewEditor />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import Topic from '@/components/Topic.vue';
import DragUpload from '@/components/NewPhotoGalleryView/DragUpload.vue';
import NewEditor from '@/components/NewEditor.vue';
</script>

<style lang="scss" scoped></style>
