<template>
	<view class="container">
		<view>用户注册表单</view>
		<form @submit="" @reset="">
			<view class="name">
				<text>用户名：</text>
				<input placeholder="请输入用户名" />
			</view>
			<view class="pwd">
				<text>密码：</text>
				<input placeholder="请输入密码" />
			</view>

			<view class="sex">
				<text>性别：</text>
				<radio-group>
					<label> <radio value="男" />男 </label>
					<label> <radio value="女" />女 </label>
					<label> <radio value="其他" />其他 </label>
				</radio-group>
			</view>

			<view class="age">
				<text>年龄：</text>
				<slider value="18" @change="sliderChange" show-value />
			</view>

			<view class="hobby">
				<text>兴趣爱好：</text>
				<checkbox-group>
					<label> <checkbox value="篮球" />篮球 </label>
					<label> <checkbox value="足球" />足球 </label>
					<label><checkbox value="羽毛球" />羽毛球 </label>
				</checkbox-group>
			</view>

			<view class="switch">
				<text>接收推广信息：</text>
				<switch :checked="false" />
			</view>

			<view class="city">
				<text>所在城市：</text>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{ array[index] }}</view>
				</picker>
			</view>

			<view class="submit">
				<button form-type="submit">提交</button>
				<button form-type="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const array = ['北京', '上海', '广州', '深圳'];
	const index = ref(0);
	const sliderChange = (e) => {
		console.log(e.detail.value);
	};
	const bindPickerChange = (e) => {
		index.value = e.detail.value;
	};
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fdead5;
		height: 100vh;
		form {
			.name {
				display: flex;
				input {
					border: 1px solid #007cff;
				}
			}
			.pwd {
				input {
				}
			}
			.sex {
				label {
				}
			}
			.age {
			}
			.hobby {
				label {
				}
			}
			.switch {
			}
			.city {
				.uni-input {
				}
			}
			.submit {
				button {
				}
			}
		}
	}
</style>
