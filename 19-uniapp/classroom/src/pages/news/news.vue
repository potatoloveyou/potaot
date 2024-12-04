<template>
	<view>
		<!-- 顶部标签 -->
		<view class="tab">
			<view class="tab_title">
				<scroll-view show-scrollbar="false" scroll-x="true" class="scroll_x">
					<view>
						<image style="width: 30rpx;height: 30rpx;" src="../../../static/shouhu.png"></image>
					</view>
					<view>要闻</view>
					<view>推荐</view>
					<view>关注流</view>
					<view>24小时</view>
					<view>娱乐</view>
					<view>桂林</view>
					<view>财经</view>
					<view>生活</view>
					<view>科技</view>
					<view>军事</view>
					<view>体育</view>
					<view>汽修</view>
					<view>健康</view>
					<view>国际</view>
					<view>千里眼</view>
					<view>5G</view>
				</scroll-view>
			</view>
		</view>
		<!-- 推荐更新 -->
		<view class="three">
			<view class="three-s">
				为您更新了15条内容
			</view>
		</view>
		<!-- 天气 -->
		<view class="twos">
			<view class="twoss">
				4°C 小雨 桂林 PM2.59
			</view>
			<view class="left">
				<input class="search_input" type="text" style="width: 180rpx; margin-right: 20rpx; font-size: 25rpx;" placeholder="搜索关键词"/>
			</view>
		</view>
		<!-- 置顶 -->
		<view class="d-three">
			<view class="xw-three" style="font-size: 18px;">
				<view>
					2020,我们温暖的记忆
				</view>
				<view class="d-threes" style="font-size: 14px;">
					<view class="j">
						<text class="zd">置顶</text>
					</view>
					<view class="j">新闻联播</view>
					<view class="j">45评</view>
				</view>
			</view>
			<view class="wx-three">
				<view>
					深林大县57年无大火是怎么做到的
				</view>
				<view class="d-threes">
					<view class="j">
						<text class="zd">置顶</text>
					</view>
					<view class="j">光明网</view>
					<view class="j">17评</view>
				</view>
			</view>
		</view>
		<!-- 新闻列表 -->
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/d.png"></image>
					</view>
					<view class="d-threess">几年近疯狂，涉案金额超3亿，一个"背包客"牵出全国跨省倒烟大案</view>
				</view>
				<view>
					<view class="threess">大河网 38评</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/xw10.png"></image>
					</view>
					<view class="d-threess">中国老年化水平加速，论养老保险在中国的重要性？人们应不应该买保险？</view>
				</view>
				<view>
					<view class="threess">新京报官微 58评</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/b.png"></image>
					</view>
					<view class="d-threess">人们都喜欢聚在一起玩耍，人们聚集在一起欢呼，是好？是坏？</view>
				</view>
				<view>
					<view class="threess">烽火君 18评</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view>加微信交友群，喜欢就聊，找喜欢的人</view>
				<view class="d-threes">
					<view class="a">
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/b.png"></image>
					</view>
					<view class="a">
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/c.png"></image>
					</view>
					<view class="a">
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/f.png"></image>
					</view>
				</view>
				<view class="d-threess">
					<view class="threess">广告 我主良缘文化</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/f.png"></image>
					</view>
					<view class="d-threess">随着经济的发展，中国各个城市发展速度越来越快，经济发展迅速，人们幸福快乐</view>
				</view>
				<view>
					<view class="threess">时代发展 8评</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/c.png"></image>
					</view>
					<view class="d-threess">随着经济的发展，中国各个城市发展速度越来越快，经济发展迅速，人们幸福快乐</view>
				</view>
				<view>
					<view class="threess">时代发展 8评</view>
				</view>
			</view>
		</navigator>
		<navigator url="../../../static/n">
			<view class="d-three">
				<view class="d-threes">
					<view>
						<image style="width: 200rpx;height: 160rpx;" src="../../../static/c.png"></image>
					</view>
					<view class="d-threess">随着经济的发展，中国各个城市发展速度越来越快，经济发展迅速，人们幸福快乐</view>
				</view>
				<view>
					<view class="threess">时代发展 8评</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.search{
		display: flex;
		flex-direction: row;
	}
	.two{
		margin: 0rpx 40rpx 25rpx 30rpx;
		color: #fff;
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
	}
	.twos{
		color: #fff;
		display: flex;
		background-color: #dd524d;
		width: 100%;
		justify-content: space-between;
		/* -webkit-justify-content:space-between */
		height: 70rpx;
	}
	.twoss{
		margin-left: 20rpx;
	}
	.reds{
		color: #dd524d;
		height: 40rpx;
	}
	.three{
		width: 100%;
		height: 120rpx;
		background-color: #dd524d;
	}
	.three-s{
		height: 100%;
		display: flex;
		align-items: flex-end;
		color: #fff;
	}
	.d-three{
		border-bottom: 1rpx solid #ccd0d9;
		margin: 20rpx;
	}
	.d-threes{
		display: flex;
		flex-direction: row;
		font-size: 14px;
	}
	a{
		margin: 20rpx 10rpx 10rpx 20rpx;
	}
	.d-threess{
		margin-left: 30rpx;
	}
	.three{
/* 		display: flex;
		flex-direction: row;
		margin: 5rpx 10rpx 10rpx 10rpx;
		font-size: 25rpx;
		color: #808080; */
		width: 100%;
		height: 140rpx;
		background-color: #dd524d;
	}
	.j{
		margin-right: 25rpx;
	}
	.threess{
		margin-bottom: 20rpx;
		font-size: 25rpx;
		color: #808080;
	}
	.search .left{
		flex: 1;
		margin-right: 70rpx;
		height: 10rpx;
		/* width: 120rpx; */
	}
	.search .right{
		width: 120rpx;
	}
	.search_input{
		background-color: #f8f8f8;
		border-radius: 40rpx;
		padding: 5rpx 30rpx 6rpx 30rpx;
		margin-right: 1rpx;
	}
	.search_img{
		height: 48rpx;
		width: 48rpx;
	}
	.tab_title view{
		/* 表示tab_title 下面所有的view都一样显示 */
		display: inline-block;
		margin-left: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.tab{
		background-color: #dd524d;
		height: 100rpx;
		position: fixed;
		z-index: 1;
		left: 0;
		width: 100%;
		margin-top: 0rpx;
	}
	.zd{
		color: #dd524d;
	}
	.scroll_x{
		height: 60rpx;
		width: 100%;
		white-space: nowrap;
	}
	::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}
	.news_list{
		margin: 200rpx 25rpx 25rpx 25rpx;
		position: absolute;
		padding-bottom: calc(var(--window-bottom));
		width: 100%;
	}
	.news_item{
		height: 150rpx;
		border-bottom: 1rpx solid #c8c7cc;
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
	}
	.news_list image{
		width: 180rpx;
		height: 140rpx;
		margin-right: 30rpx;
	}
	.news_listv .title{
		font-size: 35rpx;
	}
	.news_list .time{
		color: #c0c0c0;
		font-size: 30rpx;
		margin-top: 15rpx;
	}
	.xw-three{
		font-size: 18px;
	}
</style>
