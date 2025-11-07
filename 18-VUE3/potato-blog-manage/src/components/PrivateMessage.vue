<template>
	<el-drawer v-model="localDrawer" :with-header="false" @close="close">
		<span>Hi there!</span>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface PrivateMessageProps {
	drawer: boolean;
}

const { drawer = false } = defineProps<PrivateMessageProps>();

const emit = defineEmits<{
	(e: 'update:drawer', value: boolean): void;
}>();

const localDrawer = ref(drawer);
// 当父组件 drawer 改变时，同步更新本地状态
watch(
	() => drawer,
	(val) => {
		console.log('子组件drawer', val);
		localDrawer.value = val;
	},
);

// 当本地状态改变时（例如抽屉关闭），通知父组件
watch(localDrawer, (val) => {
	if (drawer == localDrawer.value) return;
	emit('update:drawer', val);
});

const close = (): void => {
	console.log(123);
};
onMounted(() => {
	console.log(drawer);
});
</script>

<style lang="scss" scoped></style>
