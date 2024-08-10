<template>
	<van-image width="100%" height="100%" :src="events.image" :lazy-load="true" />

	<div class="activity-botttom">
		<div class="botttom-left">
			<span class="time-text time-text-ongoing" v-if="events.time_text == '征集中'">
				{{ events.time_text }}
			</span>
			<span class="time-text time-text-ended" v-if="events.time_text == '已结束'">
				{{ events.time_text }}
			</span>

			<span class="name">
				{{ events.name }}
			</span>
		</div>
		<div class="botttom-right">
			<a href="#">立即参与></a>
		</div>
	</div>
</template>

<script setup>
defineProps({
	events: Object,
});
</script>

<style lang="scss" scoped>
.activity-botttom {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.9rem;
	.botttom-left {
		font-weight: bolder;
		flex: 8;
		padding-right: 1rem;
		box-sizing: border-box;
		.time-text {
			padding: 0.2rem 0.4rem;
			border-radius: 0 0.5rem 0 0.5rem;
		}
		.time-text-ongoing {
			background-color: #ffc533;
		}
		.time-text-ended {
			background-color: rgba(105, 105, 105, 0.5);
			color: #fff;
		}
	}
	.botttom-right {
		flex: 2;
		a {
			color: #50969f;
			font-weight: bold;
			font-size: 0.9rem;
		}
	}
}
</style>
