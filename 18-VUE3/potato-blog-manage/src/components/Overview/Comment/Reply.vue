<template>
	<div>
		<el-image :src="replyData?.user.avatar" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ReplyProps {
	data: any[];
}
const { data } = defineProps<ReplyProps>();

const replyData = ref();
onMounted(() => {
	// console.log(data);
	replyData.value = data[0];
	console.log(replyData.value.user.avatar);
});
</script>

<style lang="scss" scoped></style>
