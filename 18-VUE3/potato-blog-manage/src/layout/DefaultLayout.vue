<template>
	<div class="default-layout">
		<el-container>
			<el-header class="text-red-500">Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-container>
					<el-main>
						<RouterView />
					</el-main>
					<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
</script>
<style lang="scss"></style>

<style lang="scss" scoped>
.el-header {
	padding: $p-0;
	// color: $color-fcf;
}
</style>
