<template>
  	<view class="container">
	  	<view class="swiper-tab">  
	      <view class="swiper-tab-list {{currentTab==0 ? 'on' : ''}}" data-current="0" bindtap="swichNav">水果</view>  
	      <view class="swiper-tab-list {{currentTab==1 ? 'on' : ''}}" data-current="1" bindtap="swichNav">薯片</view>  
	      <view class="swiper-tab-list {{currentTab==2 ? 'on' : ''}}" data-current="2" bindtap="swichNav">辣条</view>
	      <view class="swiper-tab-list {{currentTab==3 ? 'on' : ''}}" data-current="3" bindtap="swichNav">方便面</view>  
	  	</view>
	  	<swiper current="{{currentTab}}" vertical="{{vertical}}"  bindchange="bindChange">
		    <swiper-item>
		        <view class="classify-hd">
		          <!-- <image src="../../images/fruits.png" mode="aspectFit"/> -->
		          <view class="classify-title">
		            水果
		          </view>
		        </view>
		        <view class="classify-detail">
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		        </view>
		    </swiper-item>
		    <swiper-item>
		        <view class="classify-hd">
		          <!-- <image src="../../images/fruits.png" mode="aspectFit"/> -->
		          <view class="classify-title">
		            薯片
		          </view>
		        </view>
		        <view class="classify-detail">
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		        </view>
		    </swiper-item>
		    <swiper-item>
		        <view class="classify-hd">
		          <!-- <image src="../../images/fruits.png" mode="aspectFit"/> -->
		          <view class="classify-title">
		            辣条
		          </view>
		        </view>
		        <view class="classify-detail">
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		        </view>
		    </swiper-item>
		    <swiper-item>
		        <view class="classify-hd">
		          <!-- <image src="../../images/fruits.png" mode="aspectFit"/> -->
		          <view class="classify-title">
		            方便面
		          </view>
		        </view>
		        <view class="classify-detail">
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		          <view class="detail-item">
		            <view class="detail-img">
		              <!-- <image src="../../images/orange.jpg" /> -->
		            </view>
		            <view class="detail-description">精选橘子</view>
		          </view>
		        </view>
		    </swiper-item>
	  	</swiper>
  	</view>
</template>


<style>
.container{
  display: flex;
  height: 100%;
  font-size: 28rpx;
}
.swiper-tab{
  width: 20%;
  height: 100%;
  border-right: 2rpx solid #ccc;
}
.swiper-tab .swiper-tab-list{
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
}
.on{
  border-left: 4rpx solid #e62424;
  color: #e62424;
}
swiper{
  flex: 1;
  height: 100%;
}
swiper swiper-item{
  height: 100%;
}
.classify-hd{
  padding: 20rpx 30rpx;
}
.classify-hd image{
  width: 100%;
  height: 200rpx;
}
.classify-hd .classify-title{
  text-align: center;
  color: #e62424;
  position: relative;
}
.classify-title::before{
  content: "";
  position: absolute;
  width: 80rpx;
  height: 4rpx;
  top: 50%;
  left: 50%;
  transform: translate(-120rpx,-50%);
  background-color: #e62424;
}
.classify-title::after{
  content: "";
  position: absolute;
  width: 80rpx;
  height: 4rpx;
  top: 50%;
  right: 50%;
  transform: translate(120rpx,-50%);
  background-color: #e62424;
}
.classify-detail{
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 30rpx;
}
.classify-detail .detail-item{
  width: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 40rpx;
  /* padding:  */
}
.detail-img{
  width: 60%;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  height: 100rpx;
}
.detail-description{
  width: 100%;
  text-align: center;
  margin-top: 20rpx;
}
</style>

