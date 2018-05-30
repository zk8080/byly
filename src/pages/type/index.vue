<template>
  	<view class="container">
	  	<div class="swiper-tab">  
	      <!-- <view :class="currentTab==0 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="0" @click="swichNav">水果</view>  
	      <view :class="currentTab==1 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="1" @click="swichNav">薯片</view>  
	      <view :class="currentTab==2 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="2" @click="swichNav">辣条</view>
	      <view :class="currentTab==3 ? 'swiper-tab-list on' : 'swiper-tab-list'" data-current="3" @click="swichNav">方便面</view>  -->


          <div v-for="(item, index) in typeList" :key="index" :class="currentTab==index ? 'swiper-tab-list on' : 'swiper-tab-list'" :data-current="index" @click="swichNav">{{item.shortName}}</div>  
	  	</div>
	  	<div class="swiper-cont">
		    <div v-for="(item, index) in typeList" :key="index" :class="currentTab==index ? 'swiper-cont-list cur' : 'swiper-cont-list'">
                <div class="weui-panel__bd" v-for="(detailItem, detailIndex) in goodsList" :key="detailIndex">
                    <navigator url="/pages/goods_detail/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
                        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                            <image class="weui-media-box__thumb" :src=" 'https://www.baoyanmall.cn' + detailItem.thum_bnail_image_url" />
                        </div>
                        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                            <div class="weui-media-box__title">{{detailItem.commodity_name}}</div>
                            <div class="weui-media-box__desc">{{detailItem.valid}}</div>
                            <div class="price">¥{{detailItem.terminalPrice}}</div> 
                        </div>
                    </navigator>
                </div>
		    </div>
	  	</div>
  	</view>
</template>

<script>
import base64 from '../../../static/images/base64';
import api from '../../utils/api'
import qs from 'qs';
export default {
    
    data () {
        return{
            vertical: true,
            currentTab: 0,
            // icon60: base64.icon60,
            typeList: [],
            goodsList: [],
            
        }
    },
    methods: {
        swichNav (e) {
            if (this.currentTab === e.target.dataset.current) {
                return false;
            }else{
                let index = e.target.dataset.current;
                this.getGoodsList(this.typeList[index]);
                this.currentTab = e.target.dataset.current
            }
        },
        bindChange (e) {
            this.currentTab = e.target.current
        },
        async getTypeData(){
            // console.log( this, "businessType" )
            const res = await api.queryNewBusinessComPany({})
            // console.log( res )
            if( res.code == "200" ){
                let dataList = res.result;
                // console.log( dataList, "dataList" )
                this.typeList = dataList;
                this.getGoodsList(this.typeList[0]);
            }
        },
        async getGoodsList(data) {
            // console.log(qs,"qs")

            let params = {
                    businessId: data.businessId,
                    commoDityTypeId: data.commoDityTypeId,
                    businessType: data.businessType,
                    sortField:"commodity_number",
                    sortMode:"ASC",
                }
            const res = await api.queryMaxTypeCommoDity(params)
            if( res.code == "200" ){
                console.log(res.result)
                this.goodsList = res.result;
            }
        },
    },
    onShow() {
        this.getTypeData();
    }
  
}
</script>

<style>
.container{
  display: flex;
  height: 100%;
  font-size: 16px;
  overflow: hidden;
}
.swiper-tab{
  width: 20%;
  height: 100%;
  border-right: 1px solid #ccc;
}
.swiper-tab .swiper-tab-list{
  text-align: center;
  height: 50px;
  line-height: 50px;
  width: 80px;
}
.on{
  border-left: 2px solid #119a26;
  color: #119a26;
}
.weui-media-box{
    box-sizing: border-box;
}
.swiper-cont{
   flex: 1;
   height: 100%;
}
.swiper-cont-list{
    display: none;
    height: 100%;
    overflow: auto;
}
.cur{
    display: block;
}
.weui-media-box__desc{
    text-overflow: ellipsis;
    overflow:hidden;
    white-space:nowrap;
}
.price{
    color: red;
}
.weui-media-box__title {
    font-size: 14px;
}
.weui-media-box__bd_in-appmsg{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:70px;
}


</style>
