<template>
	<div>收藏夹</div>
</template>

<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

</script>

<style lang="scss" scoped></style>
