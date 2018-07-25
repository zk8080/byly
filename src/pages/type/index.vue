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
                    <a @click="gotoDetail(detailItem)" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
                       <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                            <image class="weui-media-box__thumb" :src=" baseUrl + detailItem.thum_bnail_image_url" />
                        </div>
                        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                            <div class="weui-media-box__title">{{detailItem.commodity_name}}</div>
                            <div class="weui-media-box__desc">{{detailItem.commodity_describe}}</div>
                            <div class="price">¥{{detailItem.terminalPrice}}</div>
                            <div class="weui-media-box__desc">{{detailItem.valid}}</div>
                        </div>
                    </a>
                </div>
		    </div>
	  	</div>
  	</view>
</template>

<script>
import api from '../../utils/api';

export default {

    data () {
        return{
            vertical: true,
            currentTab: 0,
            typeList: [],
            goodsList: [],
            baseUrl:  this.$baseUrl
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
        gotoDetail(obj){
            let dataStr = JSON.stringify(obj);
            const url = `../goods_detail/main?data=${dataStr}`;
            wx.navigateTo({url});
        },
        async getTypeData(){
            const res = await api.queryNewBusinessComPany({})
            if( res.code == "200" ){
                let dataList = res.result;
                this.typeList = dataList;
                // console.log( dataList, "datalist" )
                this.getGoodsList(this.typeList[0]);
            }else{
                let errStr = res.message;
                wx.showToast({
                    title: errStr,
                    icon: 'none',
                    duration: 2000
                });
            }
        },
        async getGoodsList(data) {
            let params = {
                    businessId: data.businessId,
                    commoDityTypeId: data.commoDityTypeId,
                    businessType: data.businessType,
                    sortField:"commodity_number",
                    sortMode:"ASC",
                }
            const res = await api.queryMaxTypeCommoDity(params)
            if( res.code == "200" ){
                console.log(res.result, "res.result")
                this.goodsList = res.result;
            }else{
                let errStr = res.message;
                wx.showToast({
                    title: errStr,
                    icon: 'none',
                    duration: 2000
                });
            }
        },
    },
    onShareAppMessage: function (res) {
      return {
          title: '宝燕乐园',
          path: `/pages/type/main`
      }
    },
    onShow() {
        this.currentTab = 0,
        this.getTypeData();
    },
    onLoad(){
      let query = this.$root.$mp.query;
      if( query.share ){
        let data = this.$root.$mp.query.data;
        // data = JSON.parse(data);
        const url = `../goods_detail/main?data=${data}`;
        wx.navigateTo(url)
      }
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
   width: 79%;
}
.swiper-cont-list{
    display: none;
    height: 100%;
    overflow: auto;
}
.cur{
    display: block;
}
.weui-media-box_appmsg{
    display: flex;
}
.weui-media-box__desc{
    text-overflow: ellipsis;
    overflow:hidden;
    white-space:nowrap;
    display: block;
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
    height:85px;
    overflow: hidden;
    flex: 1;
}
.weui-media-box__hd_in-appmsg{
    width: 80px;
    height: 80px;
}


</style>
