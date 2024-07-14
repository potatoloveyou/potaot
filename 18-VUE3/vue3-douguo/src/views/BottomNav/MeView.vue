<template>
	<div>我的</div>
	<input type="button" value="注销" @click.prevent="logout" />
</template>

<script setup>
import { useLoginStore } from '@/stores/login';
const loginStore = useLoginStore();
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
	loginStore.logout();
	router.push('/');
};
</script>

<style lang="scss" scoped></style>
