<template>
    <div :class="showFullPage?'container cur':'container'">
        <swiper indicator-dots="true"
            autoplay="true">
            <swiper-item v-for=" (item, index) in scroll_imgList" :key="index">
                <image :lazy-load="lazy" :src="baseUrl + item.imageUrl" class="slide-image" width="355" height="150"/>
            </swiper-item>
        </swiper>
        <div class="goods_header">
            <div class="goods_title">
                <p>{{dataList.commodity_name}}</p>
            </div>
            <div class="goods_attentions">
                <p>{{dataList.commodity_describe }}</p>
            </div>
            <div class="goods_price">
                <p>¥{{dataList.terminalPrice}}</p>
            </div>
        </div>
        <div class="pay_way">
            <img src="/static/images/pay.png" alt="">
            <span>支持微信支付</span>
        </div>
        <div class="describe" v-for="(item, index) in describeImg" :key="index">
            <image mode="widthFix" :lazy-load="lazy"  :src="baseUrl + item.imageUrl" alt="" />
        </div>
        <div :class='showFullPage? "show fullpage ": "hide fullpage"' @click='close'>
            
        </div>
        <div class="order">
            <div :class='orderShow? "order-detail on": "order-detail"'>
                <div class="order-num clearfix">
                    <text class="fl">数量</text>
                    <div class="num-input fr clearfix">
                        <div>
                            <img src="/static/images/jian.png" @click='jian'/>
                            <input disabled='true' name="num" :value='orderNum'/>
                            <img src="/static/images/add.png" @click='add'/>
                        </div>
                    </div>  
                </div>
            </div>
            <div v-if="orderEnd" class="order-btn" @click='gotoPay'>
                <text>微信支付</text>
            </div>
            <div v-else class="order-btn" @click='open'>
                <text>立即购买</text>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            dataList:{},
            scroll_imgList: [],
            baseUrl: this.$baseUrl,
            describeImg: [],
            orderShow: false,
            orderEnd: false,
            showFullPage: false,
            lazy: true,
            orderNum: 1,
        }
    },
    computed: {
            
    },
    methods: {
        open(){

            this.showFullPage = true;
            this.orderShow = true;
            this.orderEnd = true;
        },
        close(){
            this.showFullPage = false;
            this.orderShow = false;
            this.orderEnd = false;
        },
        jian: function () {
            var _this = this;
            if (_this.orderNum <= 1){
                _this.orderNum = 1;
            }else{
            
                var num = _this.orderNum - 1;
                _this.orderNum = num;
            }
            
        },
        add: function () {
            // console.log(111)
            var _this = this;
            var num = _this.orderNum + 1;
            _this.orderNum = num;
        },
        gotoPay(){
            wx.navigateTo({
                url: '../msg-success/main'
            })
        },
    },
    onLoad(){
        let data = this.$root.$mp.query.data;
        data = JSON.parse(data);
        let imgList = JSON.parse(data.scroll_image_url);
        let describe_image_url = JSON.parse(data.describe_image_url);
        this.dataList = data;
        this.scroll_imgList = imgList;
        this.describeImg = describe_image_url;
    }
}
</script>

<style scoped>
.container{
    flex-direction: column;
    height: 100%;
}
.cur{
    overflow: hidden;
}
.container swiper{
    width: 100%;
    height: 220px;
}
swiper-item img{
    width: 100%;
    height: 240px;
}
.goods_header{
    padding: 10px 20px;
    background-color: #fff;
}
.goods_header .goods_title{
    font-size: 16px;
}
.goods_header .goods_attentions{
    font-size: 12px;
    color: #666;
}
.goods_header .goods_price{
    font-size: 16px;
    color: red;
}
.pay_way{
    width: 100%;
    background-color: #eee;
    padding: 10px 20px;
    box-sizing: border-box;
    /* align-items: center; */
    font-size: 14px;
    color: #666;
}
.pay_way img{
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 5px;
}
.goods_info{
    /* margin: 10px 0; */
    /* background-color: #fff; */
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
}
.goods_info div{
    display: flex;
    align-items: center;
    padding: 10px;
}
.goods_address{
    border-bottom: 1px solid #ccc;
}
.goods_address span{
    flex: 1;
    font-size: 14px;
}
.goods_info img{
    height: 20px;
    width: 20px;
    margin-right: 8px;
}
.goods_datail{
    border-bottom: 1px solid #efefef;
}
.goods_datail h1{
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    /* padding-left: 10px; */
    padding: 10px;
}
.goods_datail .detial_cont{
    font-size: 14px;
    color: #666;
    padding: 10px;
}
.goods_datail .detial_cont p{
    margin-bottom: 5px;
}
.goods_notice{
    border-bottom: 1px solid #ccc;
}
.goods_notice h1{
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #efefef;
    /* padding-left: 10px; */
    padding: 10px;
}
.goods_notice .notice_cont{
    font-size: 14px;
    color: #666;
    padding: 10px;
    margin-bottom: 30px;
}
.goods_notice .notice_cont p{
    margin-bottom: 5px;
}
.describe{
    width: 100%;
    padding-bottom: 30px;
}
.describe image{
    width: 100%;
    /* height: 1322px; */
}
.fullpage{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 888;
  overflow: hidden;
}
.order{
  width: 100%;
  height: 350rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  font-size: 32rpx;
  overflow: hidden;

}
.order .order-detail{
  width: 100%;
  background-color: #fff;
  position: absolute;
  left: 0;
  bottom: 40px; 
  z-index: 900;
  display: none;
}
.order-detail.on{
    display: block;
}
.order-detail .order-num{
  padding: 20rpx 40rpx;
  display: flex;
}
.order-num .fl{
    width: 40px;
}
.order-detail .num-input{
    flex: 1;
}
.order-detail .num-input div{
    float: right;
}
.order-detail .order-num image{
  display: inline-block;
  width: 48rpx;
  height: 48rpx;
}
.order-detail .order-num input{
  width: 64rpx;
  text-align: center;
  display: inline-block;
}
.order .order-btn{
    text-align: center;
    background-color: #119a26;
    color: #fff;
    padding: 20rpx 0;
    position: absolute;  
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000; 
}
.show{
  display: block;
}
.hide{
  display: none;
}
</style>