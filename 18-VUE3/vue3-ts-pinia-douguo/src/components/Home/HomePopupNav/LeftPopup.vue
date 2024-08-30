<template>
	<div class="left-popup df">
		<section class="popup-above df">
			<div class="recently-viewed">
				<van-icon name="clock-o" />
				最近浏览
			</div>
			<div class="draft">
				<van-icon name="todo-list-o" />
				草稿箱
			</div>
			<div class="purchase">
				<van-icon name="bag-o" />
				采购清单
			</div>
		</section>

		<section class="popup-middle df">
			<div class="mall">
				<van-icon name="point-gift-o" />
				商场
			</div>
			<div class="order">
				<van-icon name="notes-o" />
				订单
			</div>
			<div class="purse">
				<van-icon name="balance-o" />
				钱包
			</div>
			<div class="coupon">
				<van-icon name="coupon-o" />
				优惠卷
			</div>
		</section>

		<section class="popup-below df">
			<div class="cooking-tools">
				<van-icon name="paid" />
				烹饪工具
			</div>
			<div class="settings">
				<van-icon name="setting-o" />
				设置
			</div>
		</section>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.df {
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.left-popup {
	height: 100%;
	padding-left: 2rem;
	font-weight: bolder;
	i {
		font-weight: bolder;
		padding-right: 1rem;
	}
	div {
		padding: 0.5rem 0;
	}
	.popup-above {
		flex: 1;
		justify-content: flex-end;
		padding-bottom: 1rem;
	}
	.popup-middle {
		flex: 1;
	}
	.popup-below {
		justify-content: flex-start;
		flex: 1;
		padding-top: 1rem;
	}
}
</style>
