<template>
  	<view class="container">
	  	<view class="swiper-tab">  
	      <!-- <view :class="currentTab==0 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="0" @click="swichNav">水果</view>  
	      <view :class="currentTab==1 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="1" @click="swichNav">薯片</view>  
	      <view :class="currentTab==2 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="2" @click="swichNav">辣条</view>
	      <view :class="currentTab==3 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="3" @click="swichNav">方便面</view>  -->


          <div v-for="(item, index) in typeList" :key="index" :class="currentTab==index ? 'swiper-tab-list on' : 'swiper-tab-list'" :data-current="index" @click="swichNav">{{item.typeName}}</div>  
	  	</view>
	  	<swiper :current="currentTab" :vertical="vertical"  @change="bindChange">
		    <swiper-item v-for="(item, index) in typeList" :key="index">
                <div class="weui-panel__bd" v-for="(detailItem, detailIndex) in item.detailList" :key="detailIndex">
                    <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
                        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                        <image class="weui-media-box__thumb" :src="detailItem.imgUrl" />
                        </div>
                        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                            <div class="weui-media-box__title">{{detailItem.detailName}}</div>
                            <div class="weui-media-box__desc">{{detailItem.detailRemark}}</div>
                            <div class="price">¥{{detailItem.detailPrice}}</div> 
                        </div>
                    </navigator>
                </div>
		    </swiper-item>
	  	</swiper>
  	</view>
</template>

<script>
import base64 from '../../../static/images/base64';

export default {
    
  data () {
    return{
        vertical: true,
        currentTab: 0,
        // icon60: base64.icon60,
        typeList: [
            {
                typeName: '分类1',
                detailList: [
                    {
                        imgUrl: base64.icon60,
                        detailName: '旗舰店',
                        detailRemark: '每周二16：00闭园消毒；入园中途不可换人，（21、22日三楼水上乐园儿童多滑梯区域暂不开放）',
                        detailPrice: '228'
                    }
                ]
            },
            {
                typeName: '分类2',
                detailList: [
                    {
                        imgUrl: base64.icon60,
                        detailName: '旗舰店',
                        detailRemark: '每周二16：00闭园消毒；入园中途不可换人，（21、22日三楼水上乐园儿童多滑梯区域暂不开放）',
                        detailPrice: '228'
                    }
                ]
            },
            {
                typeName: '分类3',
                detailList: [
                    {
                        imgUrl: base64.icon60,
                        detailName: '旗舰店',
                        detailRemark: '每周二16：00闭园消毒；入园中途不可换人，（21、22日三楼水上乐园儿童多滑梯区域暂不开放）',
                        detailPrice: '228'
                    }
                ]
            },
            {
                typeName: '分类4',
                detailList: [
                    {
                        imgUrl: base64.icon60,
                        detailName: '旗舰店',
                        detailRemark: '每周二16：00闭园消毒；入园中途不可换人，（21、22日三楼水上乐园儿童多滑梯区域暂不开放）',
                        detailPrice: '228'
                    }
                ]
            },
            {
                typeName: '分类5',
                detailList: [
                    {
                        imgUrl: base64.icon60,
                        detailName: '旗舰店',
                        detailRemark: '每周二16：00闭园消毒；入园中途不可换人，（21、22日三楼水上乐园儿童多滑梯区域暂不开放）',
                        detailPrice: '228'
                    }
                ]
            },
        ]
    }
  },
  methods: {
    swichNav (e) {
        if (this.currentTab === e.target.dataset.current) {
            return false;
        }else{
            this.currentTab = e.target.dataset.current
        }
    },
    bindChange (e) {
        this.currentTab = e.target.current
    },
  },
  
  onLoad: function (options) {
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  }
}
</script>

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
  border-left: 4rpx solid #119a26;
  color: #119a26;
}
swiper{
  flex: 1;
  height: 100%;
}
swiper swiper-item{
  height: 100%;
}
.weui-media-box__desc{
    text-overflow: ellipsis;
    overflow:hidden;
    white-space:nowrap;
}
.price{
    color: red;
}
</style>
